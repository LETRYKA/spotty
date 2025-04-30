import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.put("/:userId", async (req: any, res: any) => {
  const { userId } = req.params;
  const { lat, lng } = req.body;

  if (!lat || !lng) return res.status(400).json({ error: "Missing lat/lng" });

  try {
    const location = await prisma.location.upsert({
      where: { userId },
      update: { lat, lng },
      create: { userId, lat, lng },
    });

    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update location" });
  }
});

export const locationRoute = router;