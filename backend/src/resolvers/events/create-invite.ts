import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

function generateId(length: number = 8): string {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = randomBytes(length);
  let id = "";
  for (let i = 0; i < length; i++) {
    id += alphabet[bytes[i] % alphabet.length];
  }
  return id;
}

const createInvite = async (req: Request, res: Response): Promise<void> => {
  const { eventId } = req.params;
  const { creatorId, expiresAt, maxUses } = req.body;

  if (!eventId) {
    res.status(400).json({ error: "eventId олдсонгүй" });
    return;
  }

  // Validate creatorId
  if (!creatorId) {
    res.status(400).json({ error: "creatorId олдсонгүй" });
    return;
  }

  let parsedMaxUses: number | null = null;
  if (maxUses !== undefined && maxUses !== null) {
    const parsed = parseInt(maxUses, 10);
    if (isNaN(parsed)) {
      res.status(400).json({ error: "maxUsers not valid number" });
      return;
    }
    parsedMaxUses = parsed;
  }

  let parsedExpiresAt: Date | undefined;
  if (expiresAt && expiresAt !== "null") {
    parsedExpiresAt = new Date(expiresAt);
    if (isNaN(parsedExpiresAt.getTime())) {
      res.status(400).json({ error: "wrong expiresAt date" });
      return;
    }
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { participants: true },
    });

    if (!event) {
      res.status(404).json({ error: "Өө эвент олдсонгүй" });
      return;
    }

    const isParticipant =
      event.participants.some((p) => p.id === creatorId) ||
      event.ownerId === creatorId;
    if (!isParticipant) {
      res.status(403).json({
        error: "Зөвхөн гишүүн линк үүсгэх боломжтой",
      });
      return;
    }

    let token: string;
    let isUnique = false;
    do {
      token = generateId(8);
      const existing = await prisma.eventInvite.findUnique({
        where: { token },
      });
      isUnique = !existing;
    } while (!isUnique);

    const invite = await prisma.eventInvite.create({
      data: {
        event: { connect: { id: eventId } },
        creator: { connect: { id: creatorId } },
        token,
        expiresAt: parsedExpiresAt,
        maxUses: parsedMaxUses,
        uses: 0,
      },
    });

    const inviteLink = `${process.env.APP_BASE_URL}/invite/${token}`;

    res.status(201).json({ inviteLink, invite });
  } catch (error) {
    console.error("Error creating invite:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default createInvite;
