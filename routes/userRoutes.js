import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  signup,
  login,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);
userRoutes.put("/signup", signup);
userRoutes.delete("login", login);
userRoutes.get("/:id", getUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
