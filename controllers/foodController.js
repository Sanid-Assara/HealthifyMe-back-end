import Food from "../models/foodModel.js";

export const getFoods = async (req, res) => {
  try {
    let foods;
    foods = await Food.find().populate("addedBy", "username");
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createFood = async (req, res) => {
  try {
    const {
      name,
      brand,
      calories,
      macronutrients,
      dietaryTags,
      imageUrl,
      addedBy,
    } = req.body;

    if (!name || !calories || !macronutrients || !addedBy) {
      return res.status(400).json({
        error: "Name, calories, macronutrients, and addedBy are required",
      });
    }

    const newFood = new Food({
      name,
      brand,
      calories,
      macronutrients,
      dietaryTags,
      imageUrl,
      addedBy,
    });

    const result = await newFood.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Food.findById(id).populate("addedBy", "username");
    if (!result) return res.status(404).json({ error: "Food item not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, calories, macronutrients, dietaryTags, imageUrl } =
      req.body;

    if (!name || !calories || !macronutrients) {
      return res
        .status(400)
        .json({ error: "Name, calories, and macronutrients are required" });
    }

    const food = await Food.findById(id);
    if (!food) return res.status(404).json({ error: "Food item not found" });

    food.name = name;
    food.brand = brand;
    food.calories = calories;
    food.macronutrients = macronutrients;
    food.dietaryTags = dietaryTags;
    food.imageUrl = imageUrl;

    await food.save();

    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Food.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Food item not found" });
    res.json({ message: "Food item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
