import express from "express";
import {
  getRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

const recipeRoutes = express.Router();

recipeRoutes.get("/", getRecipes);
recipeRoutes.post("/", createRecipe);
recipeRoutes.get("/:id", getRecipe);
recipeRoutes.put("/:id", updateRecipe);
recipeRoutes.delete("/:id", deleteRecipe);

export default recipeRoutes;
