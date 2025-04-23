import { PrismaClient } from "@prisma/client";
import webhooksRouter from "./routes/webhooks";
import { userRoute } from "./routes/user-routes";
import { friendsRoute } from "./routes/friends-routes";
import { storiesRoute } from "./routes/stories-routes";
import { locationRoute } from "./routes/location-routes";
import { eventsRoute } from "./routes/events-routes";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 8000;
const allowedOrigins = ["http://localhost:3000"];

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

// Apply express.json() only to non-webhook routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api/webhooks")) {
    return next(); // Skip express.json() for webhook routes
  }
  return express.json()(req, res, next); // Apply express.json() for other routes
});

// Routes
app.use("/api/users", userRoute);
app.use("/api/friends", friendsRoute);
app.use("/api/location", locationRoute);
app.use("/api/stories", storiesRoute);
app.use("/api/events", eventsRoute);
app.use("/api/webhooks", webhooksRouter);

app.get("/api", (req, res) => {
  res.send("API is running...");
});

app.listen(port, async () => {
  console.log(`💀 Server is running on port ${port}`);
});
