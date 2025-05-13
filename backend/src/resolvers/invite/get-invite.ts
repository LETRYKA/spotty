import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getInvite = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params;

  try {
    const invite = await prisma.eventInvite.findUnique({
      where: { token },
      include: { event: true },
    });

    if (!invite) {
      res.status(404).json({ error: "Өө Эвент олдсонгүй" });
      return;
    }

    if (invite.expiresAt && new Date() > invite.expiresAt) {
      res.status(400).json({ error: "Өө хугацаа нь дууссан байна" });
      return;
    }

    if (invite.maxUses && invite.uses >= invite.maxUses) {
      res.status(400).json({ error: "Лимит хэтэрсэн байна" });
      return;
    }

    res.status(200).json({ invite });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Serverr error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default getInvite;
