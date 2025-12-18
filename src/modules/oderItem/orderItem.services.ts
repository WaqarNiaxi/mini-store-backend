import prisma from "../../prisma/client";
import { httpError } from "../../services/error.types";
import { CreateOrderItemDTO } from "./orderItem.types";

export const createOrderItemService = async (
  userId: string,
  data: CreateOrderItemDTO
) => {
  const { productId, quantity = 1 } = data;

  return prisma.$transaction(async (tx) => {
    /* 1 Get product */
    const product = await tx.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw httpError(404, "Product not found");
    }

    /* 2 Get wallet & check balance */

    const wallet = await tx.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw httpError(404, "Wallet not found");
    }

    const totalAmount = product.price.mul(quantity);

    if (wallet.balance.lessThan(totalAmount)) {
      throw httpError(400, "Insufficient wallet balance");
    }

    /* ---------------------------------- */
    /* 3️⃣ Create order + order item */
    /* ---------------------------------- */
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount,
        items: {
          create: {
            productId,
            price: product.price,
            quantity,
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    /* ---------------------------------- */
    /* 4️⃣ Deduct wallet balance */
    /* ---------------------------------- */
    await tx.wallet.update({
      where: { userId },
      data: {
        balance: {
          decrement: totalAmount,
        },
      },
    });

    /* ---------------------------------- */
    /* 5️⃣ Wallet transaction log */
    /* ---------------------------------- */
    await tx.walletTransaction.create({
      data: {
        userId,
        type: "PURCHASE",
        amount: totalAmount,
        description: `Purchased ${quantity} × ${product.title}`,
      },
    });

    /* ---------------------------------- */
    /* 6️⃣ Return response */
    /* ---------------------------------- */
    return {
      order,
      remainingBalance: wallet.balance.minus(totalAmount),
    };
  });
};
