"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptFriend = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const acceptFriend = async (userId, requesterId) => {
    const existing = await prisma.friendship.findFirst({
        where: {
            userId: requesterId,
            friendId: userId,
            status: "pending",
        },
    });
    if (!existing)
        throw new Error("No pending request found.");
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
exports.acceptFriend = acceptFriend;
