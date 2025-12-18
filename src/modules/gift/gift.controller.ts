import { Request, Response, NextFunction } from "express";
import { createGiftService } from "./gift.services";

export const createGift = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gift = await createGiftService((req as any).user.id, req.body);
    return res.status(201).json(gift);
  } catch (error) {
    next(error);
  }
};
