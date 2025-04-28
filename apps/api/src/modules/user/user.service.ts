import { PrismaClient } from '../../../generated/prisma';

export interface RegisterUserInput {
  email: string;
  name: string;
  username: string;
  address: string;
  accountType: 'CREATOR' | 'USER' | 'ADMIN';
}

export const inputUser = async (input: RegisterUserInput) => {
  const prisma = new PrismaClient();
  const createdUser = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      username: input.username,
      address: input.address,
      accountType: input.accountType,
    },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      address: true,
      accountType: true,
    },
  });

  return createdUser;
};

export const getUserByAddress = async (address: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { address },
  });
  return user;
};

export const followUser = async (
  userAddress: string,
  targetAddress: string,
) => {
  const prisma = new PrismaClient();

  const target = await prisma.user.findUnique({
    where: { address: userAddress },
  });

  const user = await prisma.user.findUnique({
    where: { address: targetAddress },
  });

  if (!user || !target) {
    throw new Error('User not found');
  }

  const follow = await prisma.follow.create({
    data: {
      followerId: user.id,
      followingId: target.id,
    },
  });

  return follow;
};

export interface UpdateUserInput {
  name?: string;
  username?: string;
  email?: string;
  website?: string;
  bio?: string;
  language?: string;
  timezone?: string;
}

export const updateUser = async (address: string, input: UpdateUserInput) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.update({
    where: { address },
    data: {
      name: input.name,
      username: input.username,
      email: input.email,
      website: input.website,
      bio: input.bio,
      language: input.language,
      timezone: input.timezone,
    },
  });

  return user;
};
