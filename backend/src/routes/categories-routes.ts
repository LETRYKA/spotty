import express from "express"
import { getCategories } from "../resolvers/categories/get-categories";
export const categoriesRoute = express.Router();

categoriesRoute.get("/", getCategories)