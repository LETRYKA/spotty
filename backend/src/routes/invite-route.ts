import express from "express";
import joinViaInvite from "../resolvers/invite/join-via-invite";
import getInvite from "../resolvers/invite/get-invite";

export const inviteRoute = express.Router();

inviteRoute.post("/:token/join", joinViaInvite);
inviteRoute.get("/:token", getInvite);
