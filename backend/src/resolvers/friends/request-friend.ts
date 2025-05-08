import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getFriends } from "../../utils/get-friends";

const prisma = new PrismaClient();

export const requestFriend = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const friendId = req.params.id;

    if (userId === friendId) throw new Error("Can't add yourself 💀");

    await prisma.friendship.create({
      data: {
        userId,
        friendId,
        status: "pending",
      },
    });

    const friends = await getFriends(userId);
    res.status(201).json({ message: "Friend request sent", friends });
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
};
