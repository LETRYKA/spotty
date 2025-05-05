import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events = await prisma.event.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            isVerified: true,
            avatarImage: true,
            backgroundImage: true,
            moodStatus: true,
            batteryLevel: true,
          },
        },
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            isVerified: true,
            avatarImage: true,
            backgroundImage: true,
            moodStatus: true,
            batteryLevel: true,
          },
        },
      },
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export default getAllEvents;
