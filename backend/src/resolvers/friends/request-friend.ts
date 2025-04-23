import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const requestFriend = async (userId: string, friendId: string) => {
  if (userId === friendId) throw new Error("Can't add yourself 💀");

  return await prisma.friendship.create({
    data: {
      userId,
      friendId,
      status: "pending",
    },
  });
};
