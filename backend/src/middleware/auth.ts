import { verifyToken } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });
    req.userId = payload.sub;
    next();
    res.status(401).json({ error: "Invalid token" });
    return;
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};
