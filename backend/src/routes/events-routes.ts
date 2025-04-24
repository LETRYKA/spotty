
import express from "express";
import getEvent from "../resolvers/events/get-event-id";
import getAllEvents from "../resolvers/events/get-all-events";
import createEvent from "../resolvers/events/create-event";
import joinEvent from "../resolvers/events/join-event";
import leaveEvent from "../resolvers/events/leave-event";
export const eventsRoute = express.Router();

eventsRoute.post("/", createEvent)
eventsRoute.get("/:id", getEvent); 
eventsRoute.get("/", getAllEvents); 
eventsRoute.post("/:id/join",joinEvent);
eventsRoute.post("/:id/leave",leaveEvent);

