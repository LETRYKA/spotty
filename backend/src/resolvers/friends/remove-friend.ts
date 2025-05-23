import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getFriends } from "../../utils/get-friends";

const prisma = new PrismaClient();

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const friendId = req.params.id;

    await prisma.friendship.deleteMany({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });

    const friends = await getFriends(userId);

    res.status(200).json({
      message: `Removed friend ${friendId}`,
      friends,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Unknown error" });
  }
};
