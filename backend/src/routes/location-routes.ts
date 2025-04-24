import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/:userId", async (req: any, res: any) => {
  const { userId } = req.params;

  try {
    const location = await prisma.location.findFirst({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });

    if (!location) return res.status(404).json({ error: "Location not found" });

    res.json(location);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export const locationRoute = router;
