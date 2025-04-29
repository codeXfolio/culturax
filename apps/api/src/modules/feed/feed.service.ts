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
