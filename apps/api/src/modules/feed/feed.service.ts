import { PrismaClient } from '../../../generated/prisma';
import { mkdir, writeFile, access, rm } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export interface CreateFeedPostInput {
  userId: string;
  caption?: string;
  isPremium?: boolean | string;
  image?: Express.Multer.File;
}

export const createFeedPost = async (input: CreateFeedPostInput) => {
  const prisma = new PrismaClient();

  let imagePath: string | undefined = undefined;

  // Handle image upload if provided
  if (input.image) {
    try {
      // Ensure the base uploads directory exists
      const baseUploadDir = join(process.cwd(), 'uploads');
      try {
        await access(baseUploadDir);
      } catch {
        await mkdir(baseUploadDir, { recursive: true });
      }

      // Ensure the feed directory exists
      const feedDir = join(baseUploadDir, 'feed');
      try {
        await access(feedDir);
      } catch {
        await mkdir(feedDir, { recursive: true });
      }

      // Create post-specific directory
      const postId = crypto.randomUUID();
      const postUploadDir = join(feedDir, postId);
      await mkdir(postUploadDir, { recursive: true });

      // Generate unique filename
      const fileExtension = input.image.originalname.split('.').pop();
      const fileName = `image.${fileExtension}`;
      const filePath = join(postUploadDir, fileName);

      // Write the file
      await writeFile(filePath, input.image.buffer);

      // Store the relative path
      imagePath = `/uploads/feed/${postId}/${fileName}`;
    } catch (error) {
      console.error('Error handling image upload:', error);
      throw new Error('Failed to process image upload');
    }
  }

  const post = await prisma.feedPost.create({
    data: {
      userId: input.userId,
      caption: input.caption,
      isPremium:
        typeof input.isPremium === 'string'
          ? input.isPremium == 'true'
            ? true
            : false
          : input.isPremium || false,
      image: imagePath,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  return post;
};

export const deleteFeedPost = async (id: string) => {
  const prisma = new PrismaClient();

  // Delete the post directory if it exists
  const uploadDir = join(process.cwd(), 'uploads', 'feed', id);
  try {
    await rm(uploadDir, { recursive: true, force: true });
  } catch (error) {
    // Directory might not exist, which is fine
  }

  // Delete the post from database
  const post = await prisma.feedPost.delete({
    where: { id },
  });

  return post;
};

export interface CreateCommentInput {
  userId: string;
  feedPostId: string;
  comment: string;
}

export const createComment = async (input: CreateCommentInput) => {
  const prisma = new PrismaClient();

  const comment = await prisma.feedPostComment.create({
    data: {
      userId: input.userId,
      feedPostId: input.feedPostId,
      comment: input.comment,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  return comment;
};

export const deleteComment = async (id: string) => {
  const prisma = new PrismaClient();

  const comment = await prisma.feedPostComment.delete({
    where: { id },
  });

  return comment;
};

export const likePost = async (userId: string, feedPostId: string) => {
  const prisma = new PrismaClient();

  const like = await prisma.feedPostLike.create({
    data: {
      userId,
      feedPostId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  return like;
};

export const unlikePost = async (userId: string, feedPostId: string) => {
  const prisma = new PrismaClient();

  const like = await prisma.feedPostLike.findFirst({
    where: {
      userId,
      feedPostId,
    },
  });

  if (!like) {
    throw new Error('Like not found');
  }

  await prisma.feedPostLike.delete({
    where: {
      id: like.id,
    },
  });

  return like;
};

export const getPostLikes = async (feedPostId: string) => {
  const prisma = new PrismaClient();

  const likes = await prisma.feedPostLike.findMany({
    where: { feedPostId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  return likes;
};

export const getPostComments = async (feedPostId: string) => {
  const prisma = new PrismaClient();

  const comments = await prisma.feedPostComment.findMany({
    where: { feedPostId },
    include: {
      user: {
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

  return comments;
};

export interface GetFeedPostsInput {
  page?: number;
  limit?: number;
  username?: string;
}

export const getFeedPosts = async (input: GetFeedPostsInput = {}) => {
  const prisma = new PrismaClient();
  const page = input.page || 1;
  const limit = input.limit || 8;
  const skip = (page - 1) * limit;

  // Build where clause
  const where = input.username
    ? {
        user: {
          username: input.username,
        },
      }
    : {};

  const [posts, total] = await Promise.all([
    prisma.feedPost.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        FeedPostLike: {
          select: {
            userId: true,
          },
        },
        FeedPostComment: {
          select: {
            id: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true
              },
            },
          },
        },
      },
    }),
    prisma.feedPost.count({
      where,
    }),
  ]);

  return {
    posts: posts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
