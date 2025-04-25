import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getStory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const story = await prisma.story.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!story) {
      res.status(404).json({ message: "Story not found." });
      return;
    }

    res.status(200).json({
      story
    });
  } catch (error) {
    console.error("Error fetching story:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default getStory;
