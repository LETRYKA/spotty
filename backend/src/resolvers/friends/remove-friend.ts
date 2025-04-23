import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const removeFriend = async (userId: string, friendId: string) => {
  return await prisma.friendship.deleteMany({
    where: {
      OR: [
        { userId, friendId },
        { userId: friendId, friendId: userId },
      ],
    },
  });
};
