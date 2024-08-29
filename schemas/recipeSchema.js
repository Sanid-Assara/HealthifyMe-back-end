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
        type: String,
        required: true,
        enum: [
          "grams",
          "cups",
          "tablespoons",
          "teaspoons",
          "liters",
          "milliliters",
        ],
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

recipeSchema.index({ addedBy: 1 });
recipeSchema.index({ name: 1 });
recipeSchema.index({ sharedWithCommunity: 1 });

export default recipeSchema;
