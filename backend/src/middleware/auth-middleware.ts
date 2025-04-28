import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  (req as any).userId = userId;

  next();
};
