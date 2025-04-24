import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const joinEvent = async (
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

    const isAlreadyParticipant = event.participants.some(
      (p) => p.id === userId
    );
    if (isAlreadyParticipant) {
      res.status(200).json({ message: "User already joined.", event });
      return;
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        participants: {
          connect: { id: userId },
        },
      },
      include: {
        participants: true,
      },
    });

    res
      .status(200)
      .json({ message: "User added to event.", event: updatedEvent });
  } catch (error) {
    console.error("Join event error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export default joinEvent;
