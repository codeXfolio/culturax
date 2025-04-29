import { PrismaClient } from '../../../generated/prisma';
import { mkdir, writeFile, access } from 'fs/promises';
import { join } from 'path';

export interface RegisterUserInput {
  email: string;
  name: string;
  username: string;
  address: string;
  accountType: 'CREATOR' | 'USER' | 'ADMIN';
  avatar?: Express.Multer.File;
}

export const inputUser = async (input: RegisterUserInput) => {
  const prisma = new PrismaClient();

  let avatarPath: string | undefined = undefined;

  // Handle avatar upload if provided
  if (input.avatar) {
    try {
      // Ensure the base uploads directory exists
      const baseUploadDir = join(process.cwd(), 'uploads');
      try {
        await access(baseUploadDir);
      } catch {
        await mkdir(baseUploadDir, { recursive: true });
      }

      // Ensure the avatars directory exists
      const avatarsDir = join(baseUploadDir, 'avatars');
      try {
        await access(avatarsDir);
      } catch {
        await mkdir(avatarsDir, { recursive: true });
      }

      // Create user-specific directory
      const userUploadDir = join(avatarsDir, input.address);
      await mkdir(userUploadDir, { recursive: true });

      // Generate unique filename
      const fileExtension = input.avatar.originalname.split('.').pop();
      const fileName = `avatar.${fileExtension}`;
      const filePath = join(userUploadDir, fileName);

      // Write the file
      await writeFile(filePath, input.avatar.buffer);

      // Store the relative path
      avatarPath = `/uploads/avatars/${input.address}/${fileName}`;
    } catch (error) {
      console.error('Error handling avatar upload:', error);
      throw new Error('Failed to process avatar upload');
    }
  }

  const createdUser = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      username: input.username,
      address: input.address,
      accountType: input.accountType,
      avatar: avatarPath,
    },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      address: true,
      accountType: true,
      avatar: true,
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
  targetAddress: string,
  userAddress: string,
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

export const getFollowers = async (userId: string) => {
  const prisma = new PrismaClient();

  const followers = await prisma.follow.findMany({
    where: {
      followingId: userId,
    },
    include: {
      follower: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          address: true,
          accountType: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return followers;
};

export const getFollowing = async (userId: string) => {
  const prisma = new PrismaClient();

  const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
    include: {
      following: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          address: true,
          accountType: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return following;
};
