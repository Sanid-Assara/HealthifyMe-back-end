import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    default: "",
  },
  calories: {
    type: Number,
    required: true,
  },
  macronutrients: {
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
  },
  dietaryTags: {
    type: [String], // ['Vegan', 'Gluten-Free']
    default: [],
  },
  imageUrl: {
    type: String,
    default: "",
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

export default FoodSchema;
