import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers () {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        phoneNumber: true,
        name: true,
        avatarImage: true,
        backgroundImage: true,
        moodStatus: true,
        batteryLevel: true,
        createdAt: true,
        friendships: {
          select: {
            id: true,
            friendId: true,
            userId: true,
          },
        },
        friendsOf: {
          select: {
            id: true,
            friendId: true,
            userId: true,
          },
        },
        locations: true,
        events: true,
        joinedEvents: true,
        stories: true,
      },
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}