import { PrismaClient } from '../../../generated/prisma';
import { mkdir, writeFile, access } from 'fs/promises';
import { join } from 'path';

export interface RegisterUserInput {
  email: string;
  name: string;
  username: string;
  address: string;
  accountType: 'CREATOR' | 'USER' | 'ADMIN';
  avatar?: string;
}

export const inputUser = async (input: RegisterUserInput) => {
  const prisma = new PrismaClient();

  const createdUser = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      username: input.username,
      address: input.address.toUpperCase(),
      accountType: input.accountType,
      avatar: input.avatar,
      coverImage:
        'https://pbs.twimg.com/profile_banners/1431478958285934593/1746331496/1500x500',
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
    where: { address: address.toUpperCase() },
  });
  return {
    success: user ? true : false,
    data: user,
  };
};

export const getUserByUsername = async (username: string, address: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      address: true,
      avatar: true,
      coverImage: true,
      bio: true,
      featured: true,
      _count: {
        select: {
          following: true,
        },
      },
      following: {
        where: {
          follower: {
            address,
          },
        },
      },
    },
  });

  return {
    success: user ? true : false,
    data: {
      id: user?.id,
      name: user?.name,
      username: user?.username,
      address: user?.address,
      avatar: user?.avatar,
      coverImage: user?.coverImage,
      bio: user?.bio,
      totalFollowers: user?._count.following,
      featured: user?.featured,
      isFollowed: user?.following && user.following.length > 0,
    },
  };
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

  // Check if already following
  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: user.id,
      followingId: target.id,
    },
  });

  if (existingFollow) {
    throw new Error('Already following this user');
  }

  const follow = await prisma.follow.create({
    data: {
      followerId: user.id,
      followingId: target.id,
    },
  });

  return follow;
};

export const unfollowUser = async (
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

  // Check if following exists
  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: user.id,
      followingId: target.id,
    },
  });

  if (!existingFollow) {
    throw new Error('Not following this user');
  }

  const follow = await prisma.follow.deleteMany({
    where: {
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

export const updateCoverImage = async (
  userId: string,
  coverImage: Express.Multer.File,
) => {
  const prisma = new PrismaClient();

  let coverImagePath: string | undefined = undefined;

  // Handle cover image upload
  if (coverImage) {
    try {
      // Ensure the base uploads directory exists
      const baseUploadDir = join(process.cwd(), 'uploads');
      try {
        await access(baseUploadDir);
      } catch {
        await mkdir(baseUploadDir, { recursive: true });
      }

      // Ensure the covers directory exists
      const coversDir = join(baseUploadDir, 'covers');
      try {
        await access(coversDir);
      } catch {
        await mkdir(coversDir, { recursive: true });
      }

      // Create user-specific directory
      const userUploadDir = join(coversDir, userId);
      await mkdir(userUploadDir, { recursive: true });

      // Generate unique filename
      const fileExtension = coverImage.originalname.split('.').pop();
      const fileName = `cover.${fileExtension}`;
      const filePath = join(userUploadDir, fileName);

      // Write the file
      await writeFile(filePath, coverImage.buffer);

      // Store the relative path
      coverImagePath = `/uploads/covers/${userId}/${fileName}`;
    } catch (error) {
      console.error('Error handling cover image upload:', error);
      throw new Error('Failed to process cover image upload');
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      coverImage: coverImagePath,
    },
    select: {
      id: true,
      name: true,
      username: true,
      avatar: true,
      coverImage: true,
      address: true,
      accountType: true,
    },
  });

  return updatedUser;
};

export const getUserProfile = async (userId: string) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      avatar: true,
      accountType: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
