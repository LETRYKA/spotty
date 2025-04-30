import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

export const getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await prisma.categories.findUnique({
            where: { id }
        });

        if (!category) {
            res.status(404).json({ error: "Category not found" });
            return;
        }

        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get category by id" });
    }
};
