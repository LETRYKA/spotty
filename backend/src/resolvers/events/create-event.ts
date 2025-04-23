import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const createEvent = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            id,
            title,
            description,
            lat,
            lng,
            isPrivate,
            hiddenFromMap,
            password,
            owner,
            ownerId,
            participants,
            createdAt,
        } = req.body
        if (!id || !title || !description || !lat || !lng) {
            res.status(400).json({ error: "Missing required fields" })
            return
        }
        const event = await prisma.event.create({
            data: {
                id,
                title,
                description,
                lat,
                lng,
                isPrivate,
                hiddenFromMap,
                password,
                owner,
                ownerId,
                participants,
                createdAt,
            },
        })

        res.status(201).json(event)
    } catch (error) {
        console.error("Error creating event:", error)
    }
}
export default createEvent;