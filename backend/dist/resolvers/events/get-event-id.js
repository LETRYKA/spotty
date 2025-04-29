"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getEvent = async (req, res, next) => {
    const { id } = req.params;
    try {
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                owner: true,
            },
        });
        if (!event) {
            res.status(404).json({ message: "Event not found." });
            return;
        }
        res.status(200).json(event);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.default = getEvent;
