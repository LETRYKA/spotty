import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        phoneNumber: true,
        name: true,
        avatarImage: true,
        backgroundImage: true,
        moodStatus: true,
        batteryLevel: true,
        createdAt: true,
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
        locations: false,
        events: true,
        joinedEvents: true,
        stories: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ error: "Баййжээээ ✋🏻 Алдаа гарлаа 😭" });
  }
}