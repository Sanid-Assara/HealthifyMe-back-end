import Ingredient from "../models/ingredientModel.js";

export const getIngredients = async (req, res) => {
  try {
    let ingredients;
    ingredients = await Ingredient.find().populate({
      path: "addedBy",
      select: "username",
    });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createIngredient = async (req, res) => {
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

    const newIngredient = new Ingredient({
      name,
      brand,
      calories,
      macronutrients,
      dietaryTags,
      imageUrl,
      addedBy,
    });

    const result = await newIngredient.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Ingredient.findById(id).populate(
      "addedBy",
      "username"
    );
    if (!result)
      return res.status(404).json({ error: "Ingredient item not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, calories, macronutrients, dietaryTags, imageUrl } =
      req.body;

    if (!name || !calories || !macronutrients) {
      return res
        .status(400)
        .json({ error: "Name, calories, and macronutrients are required" });
    }

    const ingredient = await Ingredient.findById(id);
    if (!ingredient)
      return res.status(404).json({ error: "Ingredient item not found" });

    ingredient.name = name;
    ingredient.brand = brand;
    ingredient.calories = calories;
    ingredient.macronutrients = macronutrients;
    ingredient.dietaryTags = dietaryTags;
    ingredient.imageUrl = imageUrl;

    await ingredient.save();

    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Ingredient.findByIdAndDelete(id);
    if (!result)
      return res.status(404).json({ error: "Ingredient item not found" });
    res.json({ message: "Ingredient item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
