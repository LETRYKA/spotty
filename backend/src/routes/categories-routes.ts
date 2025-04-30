import express from "express"
import { getCategories } from "../resolvers/categories/get-categories";
import { getCategory } from "../resolvers/categories/get-category";
export const categoriesRoute = express.Router();

categoriesRoute.get("/", getCategories)
categoriesRoute.get("/:id", getCategory)