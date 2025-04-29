"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestFriend = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const requestFriend = async (userId, friendId) => {
    if (userId === friendId)
        throw new Error("Can't add yourself 💀");
    return await prisma.friendship.create({
        data: {
            userId,
            friendId,
            status: "pending",
        },
    });
};
exports.requestFriend = requestFriend;
