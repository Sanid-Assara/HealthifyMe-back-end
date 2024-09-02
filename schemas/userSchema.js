import mongoose from "mongoose";
import hashPassword from "../middlewares/hashPassword.js";
import bcrypt from "bcryptjs";
import validator from "validator";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Firstname must be at least 3 characters long"],
  },
  lastname: {
    type: String,
    minlength: [3, "Lastname must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    // select: false,
    validate: [5, "Password must be at least 5 characters long"],
  },
  profilePicture: {
    type: String,
    default: "",
  },
  dietaryPreferences: {
    type: [String], //  ['Vegan', 'Keto']
    default: [],
  },
  location: {
    type: String, // Could be city
    default: "",
  },
  savedRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  addedRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  messages: [
    {
      from: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      content: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", hashPassword);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// userSchema.index(
//   { username: 1 },
//   { name: "username_unique_index", unique: true }
// );
// userSchema.index({ email: 1 }, { name: "email_unique_index", unique: true });
userSchema.index({ savedRecipes: 1 }, { name: "savedRecipes_index" });
userSchema.index({ addedRecipes: 1 }, { name: "addedRecipes_index" });

export default userSchema;
