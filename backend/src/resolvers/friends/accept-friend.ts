import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const acceptFriend = async (userId: string, requesterId: string) => {
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
};
