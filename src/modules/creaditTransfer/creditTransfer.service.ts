import prisma from "../../prisma/client";
import { httpError } from "../../services/error.types";
import { creditTransferDTO } from "./creditTransfer.types";
import { Prisma } from "@prisma/client";





export const getCreditTransferListService = async (userId: string) => {
  const [senderList, recipientList] = await Promise.all([
    prisma.creditTransfer.findMany({
      where: { senderId: userId },
      include: { 
        recipient: { select: { name: true, email: true } }, 
      },
    }),
    prisma.creditTransfer.findMany({
      where: { recipientId: userId },
      include: { sender: { select: { name: true, email: true } } ,
    }}),
  ]);

  return { senderList, recipientList };
};

export const createCreditTransferService = async (
  senderId: string,
  data: creditTransferDTO
) => {
  const { recipientId, amount } = data;

  if (amount <= 0) {
    throw httpError(400, "Transfer amount must be greater than zero");
  }

  if (senderId === recipientId) {
    throw httpError(400, "You cannot transfer credits to yourself");
  }

  const transferAmount = new Prisma.Decimal(amount);

  return prisma.$transaction(async (tx) => {
    /* 1 Validate recipient */
    const recipient = await tx.user.findUnique({
      where: { id: recipientId },
    });
    if (!recipient) throw httpError(404, "Recipient not found");

    /* 2 Get sender wallet */

    const senderWallet = await tx.wallet.findUnique({
      where: { userId: senderId },
    });
    if (!senderWallet) throw httpError(404, "Sender wallet not found");

    if (senderWallet.balance.lessThan(transferAmount)) {
      throw httpError(400, "Insufficient wallet balance");
    }

    /* 3 Deduct sender wallet */

    await tx.wallet.update({
      where: { userId: senderId },
      data: {
        balance: { decrement: transferAmount },
      },
    });

    /* 4 Credit recipient wallet */
    await tx.wallet.update({
      where: { userId: recipientId },
      data: {
        balance: { increment: transferAmount },
      },
    });

    /* 5 Wallet transaction logs */
    await tx.walletTransaction.createMany({
      data: [
        {
          userId: senderId,
          type: "TRANSFER_SENT",
          amount: transferAmount,
          description: `Transferred ${amount} credits`,
        },
        {
          userId: recipientId,
          type: "TRANSFER_RECEIVED",
          amount: transferAmount,
          description: `Received ${amount} credits`,
        },
      ],
    });

    /* 6 CreditTransfer record */

    const transfer = await tx.creditTransfer.create({
      data: {
        senderId,
        recipientId,
        amount: transferAmount,
      },
      include: {
        sender: { select: { id: true, email: true } },
        recipient: { select: { id: true, email: true } },
      },
    });

    return {
      transfer,
      remainingBalance: senderWallet.balance.minus(transferAmount),
    };
  });
};
