import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";

export const requireAuth = async ( 
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    console.log("Session:", session);

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    (req as any).user = session.user;
    next();
  } catch (error) {
    next(error);
  }
};

