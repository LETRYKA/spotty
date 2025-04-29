"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth"); // Explained below
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.patch("/profile", auth_1.authMiddleware, async (req, res) => {
    const { phoneNumber, avatarImage, moodStatus, batteryLevel } = req.body;
    const userId = req.userId;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { phoneNumber, avatarImage, moodStatus, batteryLevel },
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to update profile" });
    }
});
exports.default = router;
