import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listFriends = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id as string;

    if (!userId) {
      res.status(400).json({ error: "Missing userId" });
      return;
    }

    const friends = await prisma.friendship.findMany({
      where: {
        status: "accepted",
        OR: [{ userId }, { friendId: userId }],
      },
      include: {
        user: {
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

    const resultMap = new Map();

    for (const f of friends) {
      const otherUser = f.user.id === userId ? f.friend : f.user;
      if (!resultMap.has(otherUser.id)) {
        resultMap.set(otherUser.id, otherUser);
      }
    }

    const uniqueFriends = Array.from(resultMap.values());

    res.status(200).json(uniqueFriends);
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};
