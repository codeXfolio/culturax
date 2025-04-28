import { PrismaClient } from '../../../generated/prisma';
import { unzip } from 'unzipit';
import { mkdir, writeFile } from 'fs/promises';
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

  // Handle zip file
  if (images) {
    const { entries } = await unzip(images.buffer);

    const uploadDir = join(
      process.cwd(),
      'uploads',
      'collections',
      collection.id,
    );
    await mkdir(uploadDir, { recursive: true });

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
