import mongoose from "mongoose";
import foodSchema from "../schemas/foodSchema.js";

const Food = mongoose.model("Food", foodSchema);
export default Food;
