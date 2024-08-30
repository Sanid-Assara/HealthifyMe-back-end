import mongoose from "mongoose";
import ingredientSchema from "../schemas/ingredientSchema.js";

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
export default Ingredient;
