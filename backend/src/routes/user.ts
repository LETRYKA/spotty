import express from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth"; // Explained below

const router = express.Router();
const prisma = new PrismaClient();

router.patch("/profile", authMiddleware, async (req, res) => {
  const { phoneNumber, avatarImage, moodStatus, batteryLevel } = req.body;
  const userId = req.userId;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { phoneNumber, avatarImage, moodStatus, batteryLevel },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to update profile" });
  }
});

export default router;
