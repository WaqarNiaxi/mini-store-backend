import prisma from "../../prisma/client";
import { UpdateWalletDTO } from "./wallet.types";

export const getWalletInfo = async (userId: string) => {
  return prisma.wallet.findUnique({
    where: { userId: userId },
    select: {
      id: true,
      balance: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
};

export const updateWalletInfo = async (
  userId: string,
  data: UpdateWalletDTO
) => {
  return prisma.wallet.update({
    where: { userId: userId },
    data,
  });
};
