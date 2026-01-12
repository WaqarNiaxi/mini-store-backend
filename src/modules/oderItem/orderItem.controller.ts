import { Request, Response, NextFunction } from "express";
import { createOrderItemService } from "./orderItem.services";

export const createOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const orderItem = await createOrderItemService(userId, req.body);
    res.status(201).json(orderItem);
  } catch (err) {
    next(err);
  }
};
