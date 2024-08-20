import express from "express";
import {
  getFoods,
  createFood,
  getFood,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";

const foodRoutes = express.Router();

foodRoutes.get("/", getFoods);
foodRoutes.post("/", createFood);
foodRoutes.get("/:id", getFood);
foodRoutes.put("/:id", updateFood);
foodRoutes.delete("/:id", deleteFood);

export default foodRoutes;
