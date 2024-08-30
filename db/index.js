import mongoose from "mongoose";
import User from "../models/userModel.js";
import Ingredient from "../models/ingredientModel.js";
import Recipe from "../models/recipeModel.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connected to MongoDB!");
    await User.ensureIndexes();
    await Ingredient.ensureIndexes();
    await Recipe.ensureIndexes();
    console.log(" collections should exist now on Atlas.");
  } catch (error) {
    console.error(" Failed to connect to MongoDB", error);
    throw error;
  }
};

export default connectToDatabase;
