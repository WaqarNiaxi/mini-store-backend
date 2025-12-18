import prisma from "../../prisma/client";
import { httpError } from "../../services/error.types";
import { giftDTO } from "./gift.types";

export const createGiftService = async (userId: string, data: giftDTO) => {
  const { productId, recipientId } = data;

  return prisma.$transaction(async (tx) => {
    /* 1 Validate product & recipient */
    const product = await tx.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw httpError(404, "Product not found");

    const recipient = await tx.user.findUnique({
      where: { id: recipientId },
    });
    if (!recipient) throw httpError(404, "Recipient not found");

    if (userId === recipientId) {
      throw httpError(400, "You cannot gift to yourself");
    }

    /* 2 Check sender wallet balance */

    const senderWallet = await tx.wallet.findUnique({
      where: { userId },
    });

    if (!senderWallet) {
      throw httpError(404, "Sender wallet not found");
    }

    if (senderWallet.balance.lessThan(product.price)) {
      throw httpError(
        400,
        `Insufficient wallet balance. sender balnce is :${senderWallet.balance} and product price is: ${product.price} `
      );
    }

    /* ---------------------------------- */
    /* 3 Create order + order item */
    /* ---------------------------------- */
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount: product.price,
        items: {
          create: {
            productId: product.id,
            price: product.price,
            quantity: 1,
          },
        },
      },
    });

    /* ---------------------------------- */
    /* 4 Deduct sender wallet balance */
    /* ---------------------------------- */
    await tx.wallet.update({
      where: { userId },
      data: {
        balance: {
          decrement: product.price,
        },
      },
    });

    /* ---------------------------------- */
    /* 5 Wallet transaction logs */
    /* ---------------------------------- */
    await tx.walletTransaction.createMany({
      data: [
        {
          userId,
          type: "GIFT_SENT",
          amount: product.price,
          description: `Gift sent to ${recipient.email}`,
        },
        {
          userId: recipientId,
          type: "GIFT_RECEIVED",
          amount: product.price,
          description: `Gift received from user ${userId}`,
        },
      ],
    });

    /* ---------------------------------- */
    /* 6 Create gift record */
    /* ---------------------------------- */
    const gift = await tx.gift.create({
      data: {
        productId,
        senderId: userId,
        recipientId,
      },
      include: {
        product: true,
        recipient: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    return {
      gift,
      orderId: order.id,
      remainingBalance: senderWallet.balance.minus(product.price),
    };
  });
};
