import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listPendingRequests = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id as string;

    if (!userId) {
      res.status(400).json({ error: "Missing userId" });
      return;
    }

    const pendingRequests = await prisma.friendship.findMany({
      where: {
        friendId: userId,
        status: "pending",
      },
      select: {
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
      },
    });

    const result = pendingRequests.map((r) => ({
      ...r.user,
    }));

    res.status(200).json(result);
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};
