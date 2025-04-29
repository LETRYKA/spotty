"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                phoneNumber: true,
                name: true,
                avatarImage: true,
                backgroundImage: true,
                moodStatus: true,
                batteryLevel: true,
                createdAt: true,
                friendships: {
                    select: {
                        id: true,
                        friendId: true,
                        userId: true,
                    },
                },
                friendsOf: {
                    select: {
                        id: true,
                        friendId: true,
                        userId: true,
                    },
                },
                locations: true,
                events: true,
                joinedEvents: true,
                stories: true,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Failed to fetch users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}
