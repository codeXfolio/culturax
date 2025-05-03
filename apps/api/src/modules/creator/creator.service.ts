import { PrismaClient } from '../../../generated/prisma';

export const getCreators = async (page: number = 1, limit: number = 9) => {
  const prisma = new PrismaClient();

  // Get featured creators (limited to 3)
  const featuredCreators = await prisma.user.findMany({
    where: {
      accountType: 'CREATOR',
      featured: true,
    },
    select: {
      id: true,
      name: true,
      username: true,
      avatar: true,
      coverImage: true,
      followers: true,
      featured: true,
      bio: true,
    },
    take: 3,
  });

  // Get regular creators with pagination
  const regularCreators = await prisma.user.findMany({
    where: {
      accountType: 'CREATOR',
      featured: false,
    },
    select: {
      id: true,
      name: true,
      username: true,
      avatar: true,
      coverImage: true,
      followers: true,
      featured: true,
      bio: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  // Get total count for pagination
  const totalCreators = await prisma.user.count({
    where: {
      accountType: 'CREATOR',
      featured: false,
    },
  });

  return {
    featured: featuredCreators.map((creator) => ({
      id: creator.id,
      name: creator.name,
      username: creator.username,
      avatar: creator.avatar,
      bio: creator.bio,
      coverImage: creator.coverImage,
      totalFollowers: creator.followers.length,
      featured: creator.featured,
    })),
    regular: regularCreators.map((creator) => ({
      id: creator.id,
      name: creator.name,
      username: creator.username,
      avatar: creator.avatar,
      bio: creator.bio,
      coverImage: creator.coverImage,
      totalFollowers: creator.followers.length,
      featured: creator.featured,
    })),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalCreators / limit),
      totalItems: totalCreators,
      itemsPerPage: limit,
    },
  };
};

export const getTopCreators = async () => {
  const prisma = new PrismaClient();

  const topCreators = await prisma.user.findMany({
    where: {
      accountType: 'CREATOR',
    },
    select: {
      id: true,
      name: true,
      username: true,
      avatar: true,
      coverImage: true,
      followers: true,
      featured: true,
      bio: true,
    },
    orderBy: {
      followers: {
        _count: 'desc',
      },
    },
    take: 3,
  });

  return topCreators.map((creator) => ({
    id: creator.id,
    name: creator.name,
    username: creator.username,
    avatar: creator.avatar,
    coverImage: creator.coverImage,
    totalFollowers: creator.followers.length,
    featured: creator.featured,
    bio: creator.bio,
  }));
};
