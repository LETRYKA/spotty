import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createStory = async (req: Request, res: Response): Promise<void> => {
  console.log("Creating story...");
  try {
    const { userId, mediaUrl, lat, lng } = req.body;

    if (!userId || !mediaUrl) {
      res.status(400).json({ error: "Missing required fields" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(400).json({ error: "User not found" });
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const story = await prisma.story.create({
      data: {
        user: { connect: { id: userId } },
        mediaUrl,
        lat: lat !== undefined ? parseFloat(lat) : null,
        lng: lng !== undefined ? parseFloat(lng) : null,
        expiresAt,
      },
    });

    res.status(201).json({
      message: "Story created successfully",
      story: {
        id: story.id,
        userId: story.userId,
        mediaUrl: story.mediaUrl,
        lat: story.lat,
        lng: story.lng,
        createdAt: story.createdAt,
        expiresAt: story.expiresAt,
      },
    });

    console.log("Story created:", story.id);
  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default createStory;
