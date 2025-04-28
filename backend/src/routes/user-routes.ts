import express from "express";
import { getUsers } from "../resolvers/user-profile/get-user";
import { requireAuth } from "../middleware/auth-middleware";

export const userRoute = express.Router();

userRoute.get("/me", requireAuth, getUsers);
