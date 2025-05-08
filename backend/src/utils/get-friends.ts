import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFriends = async (userId: string) => {
  const friends = await prisma.friendship.findMany({
    where: {
      userId,
      status: "accepted",
    },
    select: {
      friend: {
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

  return friends.map((f) => f.friend);
};
