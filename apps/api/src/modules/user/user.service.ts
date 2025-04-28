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
