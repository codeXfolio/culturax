import { PrismaClient } from '../../../generated/prisma';

export interface CreateSubscriptionInput {
  subscriberId: string;
  creatorId: string;
}

export interface MonetizationSettingsInput {
  userId: string;
  price: number;
  description?: string;
  perks?: string;
  payoutSchedule?: 'MONTHLY' | 'WEEKLY' | 'BIWEEKLY';
}

export const setMonetizationSettings = async (
  input: MonetizationSettingsInput,
) => {
  const prisma = new PrismaClient();

  // Check if user is a creator
  const user = await prisma.user.findUnique({
    where: {
      id: input.userId,
    },
    select: {
      accountType: true,
    },
  });

  if (!user || user.accountType !== 'CREATOR') {
    throw new Error('Only creators can set monetization settings');
  }

  // First try to find existing settings
  const existingSettings = await prisma.monetizationSettings.findFirst({
    where: {
      userId: input.userId,
    },
  });

  if (existingSettings) {
    // Update existing settings
    return await prisma.monetizationSettings.update({
      where: {
        id: existingSettings.id,
      },
      data: {
        price: input.price,
        description: input.description,
        perks: input.perks,
        payoutSchedule: input.payoutSchedule,
      },
    });
  } else {
    // Create new settings
    return await prisma.monetizationSettings.create({
      data: {
        userId: input.userId,
        price: input.price,
        description: input.description,
        perks: input.perks,
        payoutSchedule: input.payoutSchedule || 'MONTHLY',
      },
    });
  }
};

export const editMonetizationSettings = async (
  input: MonetizationSettingsInput,
) => {
  const prisma = new PrismaClient();

  // Check if user is a creator
  const user = await prisma.user.findUnique({
    where: {
      id: input.userId,
    },
    select: {
      accountType: true,
    },
  });

  if (!user || user.accountType !== 'CREATOR') {
    throw new Error('Only creators can edit monetization settings');
  }

  // Find existing settings
  const existingSettings = await prisma.monetizationSettings.findFirst({
    where: {
      userId: input.userId,
    },
  });

  if (!existingSettings) {
    throw new Error('Monetization settings not found');
  }

  // Update settings
  return await prisma.monetizationSettings.update({
    where: {
      id: existingSettings.id,
    },
    data: {
      price: input.price,
      description: input.description,
      perks: input.perks,
      payoutSchedule: input.payoutSchedule,
    },
  });
};

export const getMonetizationSettings = async (userId: string) => {
  const prisma = new PrismaClient();

  const settings = await prisma.monetizationSettings.findFirst({
    where: {
      userId,
    },
  });

  return settings;
};

export const createSubscription = async (input: CreateSubscriptionInput) => {
  const prisma = new PrismaClient();

  // Get creator's monetization settings
  const monetizationSettings = await prisma.monetizationSettings.findFirst({
    where: {
      userId: input.creatorId,
    },
  });

  if (!monetizationSettings) {
    throw new Error('Creator has not set up monetization settings');
  }

  // Create subscription and transaction in a transaction
  const result = await prisma.$transaction(async (tx) => {
    // Create the subscription
    const subscription = await tx.subscription.create({
      data: {
        amount: monetizationSettings.price,
        subscriberId: input.subscriberId,
        creatorId: input.creatorId,
        startDate: new Date(),
        status: 'ACTIVE',
      },
      include: {
        subscriber: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    // Create the transaction record
    await tx.transaction.create({
      data: {
        amount: monetizationSettings.price,
        type: 'SUBSCRIPTION',
        userId: input.subscriberId,
      },
    });

    return subscription;
  });

  return result;
};

export const getSubscriptions = async (userId: string) => {
  const prisma = new PrismaClient();

  const subscriptions = await prisma.subscription.findMany({
    where: {
      OR: [{ subscriberId: userId }, { creatorId: userId }],
    },
    include: {
      subscriber: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
      creator: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return subscriptions;
};
