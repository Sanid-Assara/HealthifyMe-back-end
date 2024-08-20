import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    let users;
    users = await User.find()
      .populate("savedRecipes")
      .populate("addedRecipes")
      .populate("messages.from");
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
      savedRecipes,
      addedRecipes,
      messages,
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
      savedRecipes,
      addedRecipes,
      messages,
    });

    const result = await newUser.save();

    const populatedUser = await User.findById(result._id)
      .populate("savedRecipes")
      .populate("addedRecipes")
      .populate("messages.from");

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id)
      .populate("savedRecipes")
      .populate("addedRecipes")
      .populate("messages.from");
    if (!result) return res.status(404).json({ error: "User not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      email,
      password,
      profilePicture,
      dietaryPreferences,
      location,
      savedRecipes,
      addedRecipes,
      messages,
    } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.username = username;
    user.email = email;
    user.password = password;
    user.profilePicture = profilePicture;
    user.dietaryPreferences = dietaryPreferences;
    user.location = location;
    user.savedRecipes = savedRecipes;
    user.addedRecipes = addedRecipes;
    user.messages = messages;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
