import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getFriends } from "../../utils/get-friends";

const prisma = new PrismaClient();

export const requestFriend = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const friendId = req.params.id;

    if (userId === friendId) throw new Error("Can't add yourself 💀");

    const friend = await prisma.user.findUnique({ where: { id: friendId } });
    if (!friend) throw new Error("Friend user not found 💀");

    const existing = await prisma.friendship.findFirst({
      where: { userId, friendId },
    });
    if (existing) throw new Error("Request already exists or already friends");

    await prisma.friendship.create({
      data: {
        userId,
        friendId,
        status: "pending",
      },
    });

    const friends = await getFriends(userId);

    res.status(201).json({
      message: `Sent request to ${friend.name}`,
      friends,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Unknown error" });
  }
};
