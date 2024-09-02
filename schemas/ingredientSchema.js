import mongoose from "mongoose";
const Schema = mongoose.Schema;
import validator from "validator";
const ingredientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Ingredient name is required."],
  },
  brand: {
    type: String,
    default: "",
  },
  calories: {
    type: Number,
    required: true,
    min: [0, "Calories cannot be negative."],
  },
  macronutrients: {
    protein: {
      type: Number,
      required: true,
      min: 0,
    },
    carbs: {
      type: Number,
      required: true,
      min: 0,
    },
    fat: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  dietaryTags: {
    type: [String], // ['Vegan', 'Gluten-Free']
    default: [],
  },
  imageUrl: {
    type: String,
    default: "",
    validate: [validator.isURL, "Please provide a valid URL"],
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ingredientSchema.index({ addedBy: 1 });

export default ingredientSchema;
