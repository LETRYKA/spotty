
import express from "express";
import createEvent from "../resolvers/events/create-event";
// import { getUsername } from "../resolvers/user-profile/get-username"; example import


export const eventsRoutes = express.Router();

// eventsRoutes.get("/:id/invite", getUsername); Example route
eventsRoutes.post("/", createEvent)
