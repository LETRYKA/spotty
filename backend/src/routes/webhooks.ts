import express, { Request, Response, Router } from "express";
import { Webhook } from "svix";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();

const router: Router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
      if (!CLERK_WEBHOOK_SECRET) {
        console.error("CLERK_WEBHOOK_SECRET is not set");
        res.status(500).json({ error: "not working" });
        return;
      }

      const svixHeaders = {
        "svix-id": req.headers["svix-id"] as string,
        "svix-timestamp": req.headers["svix-timestamp"] as string,
        "svix-signature": req.headers["svix-signature"] as string,
      };

      const webhook = new Webhook(CLERK_WEBHOOK_SECRET);
      const payload = webhook.verify(req.body, svixHeaders) as any;

      console.log("payload", JSON.stringify(payload, null, 2));

      if (payload.type === "user.created") {
        const {
          id,
          email_addresses,
          username,
          first_name,
          last_name,
          password_enabled,
        } = payload.data;
        const email =
          email_addresses[0]?.email_address || "unknown@example.com";
        const name =
          `${first_name || ""} ${last_name || ""}`.trim() ||
          username ||
          "Unknown";
        const isVerified =
          email_addresses[0]?.verification?.status === "verified" || false;

        const existingUser = await prisma.user.findUnique({ where: { id } });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              id,
              email,
              name,
              password: "",
              isVerified,
            },
          });
          console.log(
            `user created in db ${id}, isVerified: ${isVerified}`
          );
        } else {
          console.log(`User ${id} already exists`);
        }
      }

      // if (payload.type === "user.updated") {
      //   const { id, email_addresses, username, first_name, last_name } =
      //     payload.data;
      //   const email =
      //     email_addresses[0]?.email_address || "unknown@example.com";
      //   const name =
      //     `${first_name || ""} ${last_name || ""}`.trim() ||
      //     username ||
      //     "Unknown";
      //   const isVerified =
      //     email_addresses[0]?.verification?.status === "verified" || false;

      //   await prisma.user.update({
      //     where: { id },
      //     data: {
      //       email,
      //       name,
      //       isVerified,
      //     },
      //   });
      //   console.log(
      //     `User updated in database: ${id}, isVerified: ${isVerified}`
      //   );
      // }

      if (payload.type === "email_address.verified") {
        const { email_address } = payload.data;
        const user = await prisma.user.findFirst({
          where: { email: email_address },
        });
        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { isVerified: true },
          });
          console.log(`email verified ${user.id}, email: ${email_address}`);
        } else {
          console.log(`error: ${email_address}`);
        }
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(400).json({ success: false, error: (error as Error).message });
    }
  }
);

export default router;
