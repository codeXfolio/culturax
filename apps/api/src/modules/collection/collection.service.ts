import { PrismaClient } from '../../../generated/prisma';
import { unzip } from 'unzipit';
import { mkdir, writeFile, readdir, rm } from 'fs/promises';
import { join } from 'path';

export interface CollectionInput {
  title: string;
  description: string;
  tags: string;
  userId: string;
}

export const uploadCollection = async (
  input: CollectionInput,
  images: Express.Multer.File,
  coverImage?: Express.Multer.File,
) => {
  const prisma = new PrismaClient();

  // Create collection
  const collection = await prisma.collection.create({
    data: {
      title: input.title,
      description: input.description,
      tags: input.tags,
      userId: input.userId,
    },
  });

  const uploadDir = join(
    process.cwd(),
    'uploads',
    'collections',
    collection.id,
  );
  await mkdir(uploadDir, { recursive: true });

  // Handle cover image
  if (coverImage) {
    const coverImagePath = join(uploadDir, 'cover.jpg');
    await writeFile(coverImagePath, coverImage.buffer);

    // Update collection with cover image path
    await prisma.collection.update({
      where: { id: collection.id },
      data: {
        coverImage: `/uploads/collections/${collection.id}/cover.jpg`,
      },
    });
  }

  // Handle zip file
  if (images) {
    const { entries } = await unzip(images.buffer);

    for (const [name, entry] of Object.entries(entries)) {
      if (
        name.endsWith('.jpg') ||
        name.endsWith('.png') ||
        name.endsWith('.jpeg')
      ) {
        const buffer = await entry.arrayBuffer();
        await writeFile(join(uploadDir, name), Buffer.from(buffer));
      }
    }
  }

  return collection;
};

export const getCollectionsByUser = async (userId: string) => {
  const prisma = new PrismaClient();

  const collections = await prisma.collection.findMany({
    where: { userId },
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

  return collections;
};

export const getCollectionsByUsername = async (username: string) => {
  const prisma = new PrismaClient();

  const collections = await prisma.collection.findMany({
    where: {
      user: {
        username: username,
      },
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

  return collections;
};

interface CollectionFile {
  name: string;
  path: string;
}

export const getCollectionById = async (id: string) => {
  const prisma = new PrismaClient();

  const collection = await prisma.collection.findUnique({
    where: { id },
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

  if (!collection) {
    throw new Error('Collection not found');
  }

  // Get list of files in the collection directory
  const uploadDir = join(process.cwd(), 'uploads', 'collections', id);
  let files: CollectionFile[] = [];

  try {
    const fileNames = await readdir(uploadDir);
    files = fileNames.map((fileName) => ({
      name: fileName,
      path: `/uploads/collections/${id}/${fileName}`,
    }));
  } catch (error) {
    // Directory might not exist yet if no files were uploaded
    files = [];
  }

  return {
    ...collection,
    files,
  };
};

export const updateCollection = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    tags?: string;
    coverImage?: string;
  },
) => {
  const prisma = new PrismaClient();

  const collection = await prisma.collection.update({
    where: { id },
    data,
  });

  return collection;
};

export const deleteCollection = async (id: string) => {
  const prisma = new PrismaClient();

  // Delete the collection directory if it exists
  const uploadDir = join(process.cwd(), 'uploads', 'collections', id);
  try {
    await rm(uploadDir, { recursive: true, force: true });
  } catch (error) {
    // Directory might not exist, which is fine
  }

  // Delete the collection from database
  const collection = await prisma.collection.delete({
    where: { id },
  });

  return collection;
};
