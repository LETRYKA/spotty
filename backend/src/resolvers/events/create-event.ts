import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      lat,
      lng,
      isPrivate,
      hiddenFromMap,
      password,
      ownerId,
      participantIds,
    } = req.body;

    if (
      !title ||
      !ownerId ||
      lat === undefined ||
      lng === undefined ||
      !description ||
      !password
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
    });
    if (!owner) {
      res.status(400).json({ error: "User not found" });
      return;
    }
    if (password && password.length !== 4) {
      res.status(400).json({ error: "Password must be at least 4 characters" });
      return;
    }
    if (participantIds && Array.isArray(participantIds)) {
      const validParticipants = await prisma.user.findMany({
        where: { id: { in: participantIds } },
      });
      if (validParticipants.length !== participantIds.length) {
        res
          .status(400)
          .json({ error: "One or more participant IDs are invalid" });
        return;
      }
    }

    const event = await prisma.event.create({
      data: {
        title,
        description: description || null,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        isPrivate: isPrivate ?? false,
        hiddenFromMap: hiddenFromMap ?? false,
        password: password || null,
        startAt: new Date(),
        owner: { connect: { id: ownerId } },
        participants: participantIds
          ? { connect: participantIds.map((id: string) => ({ id })) }
          : undefined,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default createEvent;
