import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createStory = async (req: Request, res: Response): Promise<void> => {
  console.log("Creating story...");
  try {
    const { userId, mediaUrl, lat, lng, expiresAt } = req.body;

    if (!userId || !mediaUrl || !expiresAt) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const story = await prisma.story.create({
      data: {
        user: { connect: { id: userId } },
        mediaUrl,
        lat: lat !== undefined ? parseFloat(lat) : null,
        lng: lng !== undefined ? parseFloat(lng) : null,
        expiresAt: new Date(expiresAt),
      },
    });

    res.status(201).json(story);
    console.log("Story created:", story.id);
  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default createStory;
