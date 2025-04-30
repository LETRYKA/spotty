import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const categories = await prisma.categories.findMany() 
        console.log(categories);
        res.status(200).json(categories)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to fetch categories" })
    }
}