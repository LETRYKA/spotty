
import express from "express";
import getEvent from "../resolvers/events/get-event-id";
import getAllEvents from "../resolvers/events/get-all-events";
import createEvent from "../resolvers/events/create-event";
import joinEvent from "../resolvers/events/join-event";
import leaveEvent from "../resolvers/events/leave-event";
import deleteEvent from "../resolvers/events/delete-event";
import updateEvent from "../resolvers/events/update-event";
export const eventsRoute = express.Router();


eventsRoute.post("/", createEvent)
eventsRoute.get("/:id", getEvent); 
eventsRoute.get("/", getAllEvents); 
eventsRoute.post("/:id/join",joinEvent);
eventsRoute.post("/:id/leave",leaveEvent);
eventsRoute.delete("/:id", deleteEvent);
eventsRoute.post("/:id/update",updateEvent);

