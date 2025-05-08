import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getFriends } from "../../utils/get-friends";

const prisma = new PrismaClient();

export const acceptFriend = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const requesterId = req.params.id;

    const existing = await prisma.friendship.findFirst({
      where: {
        userId: requesterId,
        friendId: userId,
        status: "pending",
      },
    });

    if (!existing) throw new Error("No pending request found.");

    await prisma.friendship.update({
      where: { id: existing.id },
      data: { status: "accepted" },
    });

    await prisma.friendship.create({
      data: {
        userId,
        friendId: requesterId,
        status: "accepted",
      },
    });

    const friends = await getFriends(userId);
    res.status(200).json({ message: "Friend request accepted", friends });
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};
