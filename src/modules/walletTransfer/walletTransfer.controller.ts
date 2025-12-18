import { Request, Response, NextFunction } from "express";
import {
  createWalletTransferService,
  getWalletTransferByIdService,
  getWalletTransferList,
} from "./walletTransfer.service";
import { getUserProfile } from "../user/user.service";

export const getWalletTransfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const WalletTransferList = await getWalletTransferList(userId);
    return res.json(WalletTransferList);
  } catch (error) {
    next(error);
  }
};

export const getWalletTransferById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const walletTransfer = await getWalletTransferByIdService(id);
    if (!walletTransfer) {
      res.status(404).json({ message: "WalletTransfer not found" });
    }
    return res.json(walletTransfer);
  } catch (error) {
    next(error);
  }
};

export const createWalletTransfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;

    const userInfo = await getUserProfile(userId);
    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    const walletTransfer = await createWalletTransferService(req.body);

    return res.status(201).json(walletTransfer);
  } catch (error) {
    next(error);
  }
};
