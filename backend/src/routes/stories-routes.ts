import express from "express";
import createStory from "../resolvers/stories/create-story";
import getStory from "../resolvers/stories/get-story";
import getAllStories from "../resolvers/stories/get-all-stories";
import deleteStory from "../resolvers/stories/delete-story";
export const storiesRoute = express.Router();

storiesRoute.post("/", createStory);
storiesRoute.get("/:id", getStory); 
storiesRoute.get("/", getAllStories); 
storiesRoute.delete("/:id", deleteStory);

