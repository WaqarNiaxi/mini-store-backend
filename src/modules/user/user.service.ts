import prisma from "../../prisma/client";
import { UpdateProfileDTO } from "./user.types";

export const getUserProfile = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      wallet: true,
      giftsSent: true,
      giftsReceived: true,
      transfersSent: true,
      transfersRecv: true,
      transactions: true,
      createdAt: true,
    },
  });
};

export const updateUserProfile = async (
  userId: string,
  data: UpdateProfileDTO
) => {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      updatedAt: true,
    },
  });
};
