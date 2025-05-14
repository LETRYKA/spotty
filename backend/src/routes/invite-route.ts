import express from "express";
import joinViaInvite from "../resolvers/invite/join-via-invite";
import getInvite from "../resolvers/invite/get-invite";
import createInvite from "../resolvers/events/create-invite";

export const inviteRoute = express.Router();

inviteRoute.post("/:eventId", createInvite);
inviteRoute.post("/:token/join", joinViaInvite);
inviteRoute.get("/:token", getInvite);
