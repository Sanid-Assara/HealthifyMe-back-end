import mongoose from "mongoose";
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  ingredients: [
    {
      foodItem: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unit: {
        type: String, // 'grams', 'cups'
        required: true,
      },
    },
  ],
  steps: {
    type: [String], // Array of strings for each step
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  nutritionalInfo: {
    calories: {
      type: Number,
      required: true,
    },
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
    type: [String], // ['Vegan', 'Keto']
    default: [],
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sharedWithCommunity: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default recipeSchema;
