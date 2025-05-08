import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        phoneNumber: true,
        name: true,
        avatarImage: true,
        backgroundImage: true,
        moodStatus: true,
        batteryLevel: true,
        createdAt: true,
        isVerified: true,
        friendships: {
          select: {
            id: true,
            friendId: true,
            userId: true,
          },
        },
        friendsOf: {
          select: {
            id: true,
            friendId: true,
            userId: true,
          },
        },
        locations: true,
        events: {
          select: {
            id: true,
            name: true,
            description: true,
            startDate: true,
            endAt: true,
            participants: true,
            location: true,
            isPrivate: true,
            createdAt: true,
            categories: {
              select: {
                id: true,
                name: true,
                emoji: true,
              },
            },
          },
        },
        joinedEvents: true,
        stories: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "Хэрэглэгч олдсонгүй" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    res.status(500).json({ error: "Баййжээээ ✋🏻 Алдаа гарлаа 😭" });
  }
}
