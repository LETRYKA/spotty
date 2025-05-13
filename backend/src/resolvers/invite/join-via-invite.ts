import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const joinViaInvite = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params;
  const { userId, accept } = req.body;

  try {
    const invite = await prisma.eventInvite.findUnique({
      where: { token },
      include: { event: { include: { participants: true } } },
    });

    if (!invite) {
      res.status(404).json({ error: "Дууссан & алдаатай линк байна" });
      return;
    }

    if (invite.expiresAt && new Date() > invite.expiresAt) {
      res.status(400).json({ error: "Өө хугацаа дууссан байна" });
      return;
    }

    if (invite.maxUses && invite.uses >= invite.maxUses) {
      res.status(400).json({ error: "Өө Линк хандалт хэтэрсэн байна" });
      return;
    }

    const event = invite.event;
    if (!event) {
      res.status(404).json({ error: "Өө эвент олдсонгүй" });
      return;
    }

    if (
      event.participantLimit &&
      event.participants.length >= event.participantLimit
    ) {
      res.status(400).json({
        error: `Хандалт хэтэрсэн байна ${event.participantLimit}`,
      });
      return;
    }

    if (accept === false) {
      res.status(200).json({ message: "Урилга цуцлагдлаа" });
      return;
    }

    if (!userId) {
      res.status(400).json({ error: "UserID шаардлагатай" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ error: "Хэрэглэгч одсонгүй" });
      return;
    }

    const isAlreadyParticipant = event.participants.some(
      (p) => p.id === userId
    );
    if (isAlreadyParticipant) {
      res.status(200).json({ message: "Аль хэдийн нэгдсэн байна", event });
      return;
    }

    const updatedEvent = await prisma.event.update({
      where: { id: event.id },
      data: {
        participants: { connect: { id: userId } },
      },
      include: { participants: true },
    });

    await prisma.eventInvite.update({
      where: { id: invite.id },
      data: { uses: invite.uses + 1 },
    });

    res.status(200).json({ message: "Амжилттай нэгдлээ", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default joinViaInvite;
