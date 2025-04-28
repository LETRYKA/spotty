import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateEvent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; 
  
  if (!id) {
    res.status(400).json({ error: "Event ID is required" });
    return;
  }
  
  // Assuming userId is set via middleware or passed in the body
  const userId = req.body.userId;
  console.log("userId:", userId);

  if (!userId) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  const {
    title,
    description,
    lat,
    lng,
    isPrivate,
    hiddenFromMap,
    password,
    startAt,
    endAt,
    status,
    participantLimit
  } = req.body;

  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    if (event.ownerId !== userId) {
      res.status(403).json({ error: "You are not the owner of this event" });
      return;
    } 

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title: title || event.title,
        description: description !== undefined ? description : event.description,
        lat: lat !== undefined ? parseFloat(lat) : event.lat,
        lng: lng !== undefined ? parseFloat(lng) : event.lng,
        isPrivate: isPrivate !== undefined ? isPrivate : event.isPrivate,
        hiddenFromMap: hiddenFromMap !== undefined ? hiddenFromMap : event.hiddenFromMap,
        password: password !== undefined ? password : event.password,
        startAt: startAt ? new Date(startAt) : event.startAt,
        endAt: endAt ? new Date(endAt) : event.endAt,
        status: status || event.status,
        participantLimit: participantLimit !== undefined ? participantLimit : null
      },
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default updateEvent;
