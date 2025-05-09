import { Request, Response } from "express";
import { PrismaClient, EventStatus } from "@prisma/client";

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
      backgroundImage,
      galleryImages,
    } = req.body;
 
    if (
      !title ||
      !ownerId ||
      lat === undefined ||
      lng === undefined ||
      isPrivate === undefined ||
      !participantLimit ||
      !startAt ||
      !Array.isArray(categories) ||
      categories.length === 0
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

    if (isPrivate && !password) {
      res.status(400).json({ error: "A password is required for private events." });
      return;
    }

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

    if (!Array.isArray(galleryImages) || galleryImages.length > 5) {
      res.status(400).json({ error: "You must provide up to 5 gallery images as an array." });
      return;
    }

    if (backgroundImage && typeof backgroundImage !== "string") {
      res.status(400).json({ error: "backgroundImage must be a string." });
      return;
    }

    let eventStatus: EventStatus = EventStatus.UPCOMING;
    const allowedStatuses: EventStatus[] = [
      EventStatus.UPCOMING,
      EventStatus.ONGOING,
      EventStatus.ENDED,
      EventStatus.CANCELLED,
    ];

    if (status && allowedStatuses.includes(status)) {
      eventStatus = status;
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        isPrivate,
        hiddenFromMap: hiddenFromMap ?? false,
        password: password || null,
        backgroundImage: backgroundImage || null,
        galleryImages,
        owner: { connect: { id: ownerId } },
        participants: participantIds
          ? { connect: participantIds.map((id: string) => ({ id })) }
          : undefined,
        status: eventStatus,
        startAt: startAt ? new Date(startAt) : new Date(),
        endAt: endAt ? new Date(endAt) : null,
        participantLimit,
        categories: {
          connect: categories.map((id: string) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    });

    if (event.status !== EventStatus.CANCELLED) {
      const now = new Date().getTime();

      if (new Date(event.startAt).getTime() <= now) {
        await prisma.event.update({
          where: { id: event.id },
          data: { status: EventStatus.ONGOING },
        });
      }

      if (event.endAt && new Date(event.endAt).getTime() <= now) {
        await prisma.event.update({
          where: { id: event.id },
          data: { status: EventStatus.ENDED },
        });
      }
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
