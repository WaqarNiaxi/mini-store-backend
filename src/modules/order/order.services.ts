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

  return {order};
  // "productId": "1",
  //       "price": "9.99",
  //       "quantity": 2,
};

export const getOrderAllList = async (userId: string) => {
  return await prisma.order.findMany({
    where: { userId },
    select: {
      id:true,
      totalAmount: true,
      createdAt: true,
      items: {
        select: {
          productId: true,
          price: true,
          quantity: true,
          product: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });
};
