import express from "express";

const getUsers = async (req, res) => {
  try {
    res.send("get request for users");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    res.send("post request for a user");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    res.send("get request for a user");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    res.send("put request for a user");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    res.send("delete request for a user");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userRoutes = express.Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", createUser);
userRoutes.get("/:id", getUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
