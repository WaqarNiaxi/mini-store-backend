import { Request, Response, NextFunction } from "express";
import { getUserProfile } from "../user/user.service";
import { createOrderService, getOrderAllList } from "./order.services";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const userInfo = await getUserProfile(userId);
    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = await createOrderService(userId, req.body);
    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getOrderList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const orders = await getOrderAllList(userId);
    if (!orders) {
      return res.status(404).json({ message: "orders not found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
