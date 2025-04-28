import { PrismaClient } from '../../../generated/prisma';

export const getCreators = async () => {
  const prisma = new PrismaClient();
  const creators = await prisma.user.findMany({
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
    },
  });
  return creators;
};
