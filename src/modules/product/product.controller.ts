import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/client";
import axios from "axios";
import { getProductList } from "./product.service";

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 5. Fetch again to return newly inserted data
    let products = await getProductList();
    res.json(products);
  } catch (error) {
    next(error);
  }
};
