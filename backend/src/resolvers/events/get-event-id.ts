import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarImage: true,
            isVerified: true,
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

    if (!event) {
      res.status(404).json({ message: "Event not found." });
      return;
    }

    const totalParticipants = event.participants.length;

    res.status(200).json({
      event,
      totalParticipants,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export default getEvent;