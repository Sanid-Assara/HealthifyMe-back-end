import mongoose from "mongoose";
import recipeSchema from "../schemas/recipeSchema.js";

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
