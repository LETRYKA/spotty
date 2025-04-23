import { verifyToken } from "@clerk/clerk-sdk-node";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });
    req.userId = payload.sub; // Clerk user ID
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
