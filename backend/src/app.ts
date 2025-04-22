import { PrismaClient } from "@prisma/client";
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
app.use(express.json());

// app.use("/api/example", exampleRoute);

app.get("/api", (req, res) => {
  res.send("API is running...");
});

app.listen(port, async () => {
  console.log(`💀 Server is running on port ${port}`);
});
