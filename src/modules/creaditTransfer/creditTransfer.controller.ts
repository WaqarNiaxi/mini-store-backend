import { Request, Response, NextFunction } from "express";
import { createCreditTransferService } from "./creditTransfer.service";

export const createCreditTransfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const senderId = (req as any).user.id;
    const result = await createCreditTransferService(senderId, req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
