import prisma from "../../prisma/client";
import { CreateWalletTransactionDto } from "./walletTransfer.types";

export const getWalletTransferList = async () => {
  return prisma.walletTransaction.findMany();
};

export const getWalletTransferByIdService = async (id: string) => {
  const transaction = await prisma.walletTransaction.findUnique({
    where: { id },
  });

  return transaction;
};

export const createWalletTransferService = async (
  data: CreateWalletTransactionDto
) => {
  const { userId, type, amount, description = "" } = data;

  // 2️⃣ Create wallet transaction
  const transaction = await prisma.walletTransaction.create({
    data: {
      userId,
      type,
      amount: amount,
      description,
    },
  });

  return transaction;
};
