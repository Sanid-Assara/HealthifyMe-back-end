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

export const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      profilePicture,
      dietaryPreferences,
      location,
    } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    const newUser = new User({
      username,
      email,
      password,
      profilePicture,
      dietaryPreferences,
      location,
    });

    const result = await newUser.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    res.send("get request for a single user");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    res.send("put request for a user");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    res.send("delete request for a user");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
