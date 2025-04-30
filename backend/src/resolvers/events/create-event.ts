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
      ownerId,
      participantIds,
      startAt,
      endAt,
      status,
      participantLimit,
      categories,
    } = req.body;

    // Check for required fields
    if (
      !title ||
      !ownerId ||
      lat === undefined ||
      lng === undefined ||
      !description ||
      isPrivate === undefined ||
      !participantLimit ||
      !Array.isArray(categories) ||
      categories.length === 0
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Check if the owner exists
    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
    });
    if (!owner) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    // Validate password if needed
    if (password && password.length !== 4) {
      res.status(400).json({ error: "Password must be at least 4 characters" });
      return;
    }

    if (isPrivate && !password) {
      res.status(400).json({ error: "A password is required for private events." });
      return;
    }

    // Check for valid participant IDs
    if (participantIds && Array.isArray(participantIds)) {
      const validParticipants = await prisma.user.findMany({
        where: { id: { in: participantIds } },
      });
      if (validParticipants.length !== participantIds.length) {
        res.status(400).json({ error: "One or more participant IDs are invalid" });
        return;
      }
      if (participantLimit && participantIds.length > participantLimit) {
        res.status(400).json({ error: `Participant limit of ${participantLimit} exceeded` });
        return;
      }
    }
    const existingCategories = await prisma.categories.findMany({
      where: { id: { in: categories } },
    });

    if (existingCategories.length !== categories.length) {
      res.status(400).json({ error: "One or more categories not found" });
      return;
    }

    console.log("Categories to connect:", categories); 

    const event = await prisma.event.create({
      data: {
        title,
        description: description || null,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        isPrivate: isPrivate ?? false,
        hiddenFromMap: hiddenFromMap ?? false,
        password: password || null,
        owner: { connect: { id: ownerId } },
        participants: participantIds
          ? { connect: participantIds.map((id: string) => ({ id })) }
          : undefined,
        status: status || "UPCOMING",
        startAt: startAt ? new Date(startAt) : new Date(),
        endAt: endAt ? new Date(endAt) : null,
        participantLimit: participantLimit !== undefined ? participantLimit : null,
        categories: {
          connect: categories.map((id: string) => ({ id })),
        },
      },
      include: { 
        categories: true
      }
    });

    // Update event status based on startAt and endAt
    if (new Date(event.startAt).getTime() <= new Date().getTime()) {
      await prisma.event.update({
        where: { id: event.id },
        data: { status: "ONGOING" },
      });
    }

    if (event.endAt && new Date(event.endAt).getTime() <= new Date().getTime()) {
      await prisma.event.update({
        where: { id: event.id },
        data: { status: "ENDED" },
      });
    }

    res.status(201).json(event);
    console.log("Event created:", event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default createEvent;
