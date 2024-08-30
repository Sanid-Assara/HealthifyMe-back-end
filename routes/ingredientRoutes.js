import express from "express";
import {
  getIngredients,
  createIngredient,
  getIngredient,
  updateIngredient,
  deleteIngredient,
} from "../controllers/ingredientController.js";

const ingredientRoutes = express.Router();

ingredientRoutes.get("/", getIngredients);
ingredientRoutes.post("/", createIngredient);
ingredientRoutes.get("/:id", getIngredient);
ingredientRoutes.put("/:id", updateIngredient);
ingredientRoutes.delete("/:id", deleteIngredient);

export default ingredientRoutes;
