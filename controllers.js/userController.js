import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    let users;
    users = await User.find();
    res.json(users);
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
    res.send("get request for a single user");
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
