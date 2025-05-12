import { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const prisma = new PrismaClient();

const verifyPasscode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { passcode } = req.body;

  if (!passcode) {
    res.status(400).json({ message: "Passcode is required" });
    return;
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        isPrivate: true,
        password: true,
        ownerId: true,
        participants: {
          select: { id: true },
        },
      },
    });

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    if (!event.isPrivate) {
      res.status(200).json({
        message: "Event is public",
        valid: true,
      });
      return;
    }

    const userId = req.user?.id;

    const isOwner = userId === event.ownerId;
    const isParticipant = event.participants.some((p) => p.id === userId);

    if (isOwner || isParticipant) {
      res.status(200).json({
        message: "Access granted",
        valid: true,
      });
      return;
    }
    if (!event.password) {
      res.status(400).json({
        message: "This private event has no passcode set",
        valid: false,
      });
      return;
    }

    const validPasscode = await bcrypt.compare(passcode, event.password);

    res.status(validPasscode ? 200 : 401).json({
      message: validPasscode ? "Access granted" : "Access denied",
      valid: validPasscode,
    });
  } catch (error) {
    console.error("Error verifying passcode:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default verifyPasscode;
