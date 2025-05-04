import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listFriends = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).json({ error: "Missing userId" });
      return;
    }
    const friends = await prisma.friendship.findMany({
      where: {
        userId,
        status: "accepted",
      },
      select: {
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarImage: true,
            phoneNumber: true,
            isVerified: true,
            batteryLevel: true,
            moodStatus: true,
            backgroundImage: true,
            locations: {
              select: { lat: true, lng: true },
            },
          },
        },
      },
    });

    const result = friends.map((f) => ({
      ...f.friend,
    }));
    res.status(200).json(result);
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};