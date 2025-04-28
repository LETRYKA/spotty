import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const {
    name,
    phoneNumber,
    avatarImage,
    backgroundImage,
    moodStatus,
    batteryLevel,
    isVerified,
  } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(phoneNumber !== undefined && { phoneNumber }),
        ...(avatarImage !== undefined && { avatarImage }),
        ...(backgroundImage !== undefined && { backgroundImage }),
        ...(moodStatus !== undefined && { moodStatus }),
        ...(batteryLevel !== undefined && { batteryLevel }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        avatarImage: true,
        backgroundImage: true,
        moodStatus: true,
        batteryLevel: true,
        isVerified: true,
        createdAt: true,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error("Failed to update user:", error);
    res.status(500).json({ error: "Баййжээээ ✋🏻 Алдаа гарлаа 😭", details: error.message });
  }
}