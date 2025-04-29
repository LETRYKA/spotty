"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const removeFriend = async (userId, friendId) => {
    return await prisma.friendship.deleteMany({
        where: {
            OR: [
                { userId, friendId },
                { userId: friendId, friendId: userId },
            ],
        },
    });
};
exports.removeFriend = removeFriend;
