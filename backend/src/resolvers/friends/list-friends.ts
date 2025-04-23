import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listFriends = async (userId: string) => {
  const friends = (await prisma.friendship.findMany({
    where: {
      userId,
      status: "accepted",
    },
    include: {
      friend: true,
    },
  })) as { friend: any }[];

  return friends.map((f) => f.friend);
};
