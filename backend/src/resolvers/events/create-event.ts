import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createEvent = async (req: Request, res: Response): Promise<void> => {
  console.log("Creating event...");

  try {
    const {
      title,
      description,
      lat,
      lng,
      isPrivate,
      hiddenFromMap,
      password,
      participantIds,
      startAt,
      endAt,
      status,
    } = req.body;

    const userId = (req as any).userId;

    if (
      !title ||
      !userId ||
      lat === undefined ||
      lng === undefined ||
      !description ||
      isPrivate === undefined
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const owner = await prisma.user.findUnique({ where: { id: userId } });
    if (!owner) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    if (password && password.length !== 4) {
      res.status(400).json({ error: "Password must be at least 4 characters" });
      return;
    }

    if (isPrivate && !password) {
      res
        .status(400)
        .json({ error: "A password is required for private events." });
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
        owner: { connect: { id: userId } },
        participants: participantIds
          ? { connect: participantIds.map((id: string) => ({ id })) }
          : undefined,
        status: status || "UPCOMING",
        startAt: startAt ? new Date(startAt) : new Date(),
        endAt: endAt ? new Date(endAt) : null,
      },
    });

    const now = new Date().getTime();

    if (new Date(event.startAt).getTime() <= now) {
      await prisma.event.update({
        where: { id: event.id },
        data: { status: "ONGOING" },
      });
      console.log(`Event ${event.title} status updated to "ONGOING"`);
    }

    if (event.endAt && new Date(event.endAt).getTime() <= now) {
      await prisma.event.update({
        where: { id: event.id },
        data: { status: "ENDED" },
      });
      console.log(`Event ${event.title} status updated to "ENDED"`);
    }

    res.status(201).json(event);
    console.log("Event created:", event.id);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default createEvent;
