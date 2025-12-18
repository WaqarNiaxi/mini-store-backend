import prisma from "../../prisma/client";
import { UpdateWalletDTO } from "./wallet.types";

export const getWalletInfo = async (userId: string) => {
  return prisma.wallet.findUnique({
    where: { userId: userId },
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
