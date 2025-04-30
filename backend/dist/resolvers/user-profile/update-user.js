"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = updateUser;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function updateUser(req, res) {
    const { id } = req.params;
    const { name, phoneNumber, avatarImage, backgroundImage, moodStatus, batteryLevel, isVerified, } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(phoneNumber !== undefined && { phoneNumber }),
                ...(avatarImage !== undefined && { avatarImage }),
                ...(backgroundImage !== undefined && { backgroundImage }),
                ...(moodStatus !== undefined && { moodStatus }),
                ...(batteryLevel !== undefined && { batteryLevel }),
                ...(isVerified !== undefined && { isVerified }),
            },
            select: {
                id: true,
                email: true,
                name: true,
                phoneNumber: true,
                avatarImage: true,
                backgroundImage: true,
                moodStatus: true,
                batteryLevel: true,
                isVerified: true,
                createdAt: true,
            },
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error("Failed to update user:", error);
        res.status(500).json({ error: "Failed to update user", details: error.message });
    }
}
