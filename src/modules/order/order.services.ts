import prisma from "../../prisma/client";
import { createOrderDTO } from "./order.types";

export const createOrderService = async (
  userId: string,
  data: createOrderDTO
) => {
  const { totalAmount } = data;
  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
    },
  });

  return order;
};

export const getOrderAllList = async (userId: string) => {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
};
