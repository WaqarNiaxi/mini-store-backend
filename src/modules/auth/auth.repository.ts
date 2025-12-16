import { prisma } from "../../config/prisma";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = (data: { email: string; name?: string; password: string }) => {
  return prisma.user.create({ data });
};

export const createWalletForUser = (userId: string) => {
  return prisma.wallet.create({
    data: {
      userId,
      balance: 1000,
    },
  });
};
