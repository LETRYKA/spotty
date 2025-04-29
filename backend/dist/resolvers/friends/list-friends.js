"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFriends = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const listFriends = async (userId) => {
    const friends = (await prisma.friendship.findMany({
        where: {
            userId,
            status: "accepted",
        },
        include: {
            friend: true,
        },
    }));
    return friends.map((f) => f.friend);
};
exports.listFriends = listFriends;
