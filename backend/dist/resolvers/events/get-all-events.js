"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllEvents = async (req, res, next) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                owner: true,
            },
        });
        res.status(200).json(events);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.default = getAllEvents;
