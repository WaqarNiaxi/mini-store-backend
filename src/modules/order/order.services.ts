import prisma from "../../prisma/client";
import { createOrderDTO } from "./order.types";

export const createOrderService = async (data: createOrderDTO) => {
  const { userId, totalAmount } = data;
  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
    },
  });

  return order;
};

export const getOrderAllList = async () => {
  return await prisma.order.findMany();
};
