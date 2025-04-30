"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = getUserById;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id },
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
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Failed to fetch user:", error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
}
