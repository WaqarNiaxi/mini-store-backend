import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/client";
import { getWalletInfo, updateWalletInfo } from "./wallet.services";

export const getWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const wallet = await getWalletInfo(userId);

    if (!wallet) {
      return res.status(404).json({
        message: "wallete not found",
      });
    }
    res.json(wallet);
  } catch (error) {
    next(error);
  }
};

export const updateWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const { balance } = req.body;
    const updatedWallet = await updateWalletInfo(userId, { balance });
    if (!updatedWallet) {
      return res.status(401).json({ message: "wallet not update" });
    }

    res.json({
      message: "wallet updated successfully",
      updatedWallet,
    });
  } catch (error) {
    next(error);
  }
};
