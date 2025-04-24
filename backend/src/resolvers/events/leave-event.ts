import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const leaveEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const eventId = req.params.id;
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ error: "User ID is required." });
    return;
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { participants: true },
    });

    if (!event) {
      res.status(404).json({ error: "Event not found." });
      return;
    }

    const isParticipant = event.participants.some(p => p.id === userId);
    if (!isParticipant) {
      res.status(400).json({ message: "User is not a participant of this event." });
      return;
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        participants: {
          disconnect: { id: userId },
        },
      },
      include: {
        participants: true,
      },
    });

    res.status(200).json({ message: "User removed from event.", event: updatedEvent });
  } catch (error) {
    console.error("Leave event error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export default leaveEvent;
