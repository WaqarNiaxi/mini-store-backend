import { Request, Response, NextFunction, response } from "express";
import { createGiftService, getGiftListService } from "./gift.services";

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


export const getGiftList=async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  try{
    const giftList=await getGiftListService((req as any).user.id)
    res.status(200).json(giftList)
  }
  catch(error){
    next(error)
  }
}
