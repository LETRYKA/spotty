import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listFriends = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;

    const friends = await prisma.friendship.findMany({
      where: {
        userId,
        status: "accepted",
      },
      include: {
        friend: true,
      },
    });

    const result = friends.map((f) => f.friend);
    res.status(200).json(result);
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};
