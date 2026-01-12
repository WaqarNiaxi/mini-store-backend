import { Request, Response, NextFunction } from "express";
import { getAllUserService, getUserProfile, updateUserProfile } from "./user.service";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    const user = await getUserProfile(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUser=async(
  req:Request,
  res: Response,
  next: NextFunction
)=>{
  try{
    const userList= await getAllUserService();
    if(!userList){
      res.status(404).json({message: "user Not Found"})
    }
    res.json(userList)
  }
  catch(error){
    next(error)
  }
}

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const { name, email } = req.body;

    const updatedUser = await updateUserProfile(userId, {
      name,
      email,
    });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
