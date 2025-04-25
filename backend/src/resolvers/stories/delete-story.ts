import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteStory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const existingStory = await prisma.story.findUnique({
      where: { id },
    });

    if (!existingStory) {
      res.status(404).json({ error: "Story not found." });
      return;
    }

    await prisma.story.delete({
      where: { id },
    });

    res.status(200).json({ message: "Story deleted successfully." });
  } catch (error) {
    console.error("Error deleting story:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default deleteStory;
