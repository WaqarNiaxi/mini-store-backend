import { Request, Response, NextFunction } from "express";
import { createCreditTransferService, getCreditTransferListService } from "./creditTransfer.service";

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


export const getCreditTransferList=async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  try{
    const giftList=await getCreditTransferListService((req as any).user.id)
    res.status(200).json(giftList)
  }
  catch(error){
    next(error)
  }
}