import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

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
      firstname,
      lastname,
      email,
      password,
      profilePicture,
      dietaryPreferences,
      location,
      savedRecipes,
      addedRecipes,
      messages,
    } = req.body;

    const found = await User.findOne({ email });
    if (found) throw new Error("User already exist");

    if (!firstname || !email || !password) {
      return res
        .status(400)
        .json({ error: "firstname, email, and password are required" });
    }

    const newUser = new User({
      firstname,
      lastname,
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

    res.status(201).json(result);
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
      firstname,
      lastname,
      email,
      password,
      profilePicture,
      dietaryPreferences,
      location,
      savedRecipes,
      addedRecipes,
      messages,
    } = req.body;

    if (!firstname || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.firstname = firstname;
    user.lastname = lastname;
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

export const getProfile = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      message: "You are authorized to this protected route",
      userId: verified.id,
      email: verified.email,
    });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
