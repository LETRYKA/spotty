
import express from "express";
import getEvent from "../resolvers/events/get-event-id";
import getAllEvents from "../resolvers/events/get-all-events";
import createEvent from "../resolvers/events/create-event";
export const eventsRoute = express.Router();

eventsRoute.post("/", createEvent)
eventsRoute.get("/:id", getEvent); 
eventsRoute.get("/", getAllEvents); 

