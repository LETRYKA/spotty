import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { WebSocketServer } from "ws";
import http from "http";

import webhooksRouter from "./routes/webhooks";
import { userRoute } from "./routes/user-routes";
import { friendsRoute } from "./routes/friends-routes";
import { storiesRoute } from "./routes/stories-routes";
import { locationRoute } from "./routes/location-routes";
import { eventsRoute } from "./routes/events-routes";
import { categoriesRoute } from "./routes/categories-routes";

dotenv.config();
const prisma = new PrismaClient();
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const port = process.env.PORT || 8000;
const allowedOrigins = [
  "http://localhost:3000",
  "https://spottyproject.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.path.startsWith("/api/webhooks")) return next();
  return express.json()(req, res, next);
});

// routes
app.use("/api/users", userRoute);
app.use("/api/friends", friendsRoute);
app.use("/api/location", locationRoute);
app.use("/api/stories", storiesRoute);
app.use("/api/events", eventsRoute);
app.use("/api/webhooks", webhooksRouter);
app.use("/api/categories", categoriesRoute);

app.get("/api", (req, res) => {
  res.send("API is running...");
});

const clients = new Map();
// WEBSOCKET
wss.on("connection", (ws) => {
  ws.on("message", async (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === "location-update") {
        const { userId, lat, lng } = msg;

        if (!userId || typeof lat !== "number" || typeof lng !== "number")
          return;

        await prisma.location.upsert({
          where: { userId },
          update: { lat, lng },
          create: { userId, lat, lng },
        });

        clients.set(userId, ws);

        for (const [otherUserId, client] of clients.entries()) {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send(
              JSON.stringify({
                type: "friend-location-update",
                userId,
                lat,
                lng,
              })
            );
          }
        }
      }
    } catch (err) {
      console.error("WebSocket error:", err);
    }
  });

  ws.on("close", () => {
    for (const [userId, client] of clients.entries()) {
      if (client === ws) clients.delete(userId);
    }
  });
});

server.listen(port, () => {
  console.log(`💀 Server is running on port ${port} (websocket enabled)`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
