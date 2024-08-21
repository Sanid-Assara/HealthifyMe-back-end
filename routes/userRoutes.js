import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  logout,
  login,
  protectedUser,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/protected", protectedUser);
userRoutes.get("/:id", getUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
