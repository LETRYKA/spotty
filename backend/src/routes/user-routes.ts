import express from "express";
import { getUsers } from "../resolvers/user-profile/get-user";

export const usersRoute = express.Router();
usersRoute.get("/me", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
