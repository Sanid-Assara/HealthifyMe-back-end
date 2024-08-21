import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  logout,
  login,
  getProfile,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/profile", getProfile);
userRoutes.get("/:id", getUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
