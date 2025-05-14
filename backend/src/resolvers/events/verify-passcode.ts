import { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";

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
    res.status(400).json({ message: "Passcode is required", valid: false });
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
        participants: { select: { id: true } },
      },
    });

    if (!event) {
      res.status(404).json({ message: "Event not found", valid: false });
      return;
    }

    if (!event.isPrivate) {
      res.status(200).json({ message: "Event is public", valid: true });
      return;
    }

    const userId = req.user?.id;

    if (userId) {
      const isOwner = userId === event.ownerId;
      const isParticipant = event.participants.some((p) => p.id === userId);

      if (isOwner || isParticipant) {
        res.status(200).json({ message: "Access granted", valid: true });
        return;
      }
    }

    if (!event.password) {
      res
        .status(400)
        .json({ message: "Private event has no passcode", valid: false });
      return;
    }

    const isValid = passcode === event.password;

    res.status(isValid ? 200 : 401).json({
      message: isValid ? "Access granted" : "Access denied",
      valid: isValid,
    });
  } catch (error) {
    console.error("Error verifying passcode:", error);
    res.status(500).json({ message: "Server error", valid: false });
  }
};

export default verifyPasscode;
