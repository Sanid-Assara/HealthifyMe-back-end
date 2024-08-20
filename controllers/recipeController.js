import Recipe from "../models/recipeModel.js";
import Food from "../models/foodModel.js";

export const getRecipes = async (req, res) => {
  try {
    let recipes = await Recipe.find()
      .populate("ingredients.foodItem", "name")
      .populate("addedBy", "username");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const {
      name,
      description,
      ingredients,
      steps,
      imageUrl,
      nutritionalInfo,
      dietaryTags,
      addedBy,
      sharedWithCommunity,
    } = req.body;

    if (!name || !ingredients || !steps || !nutritionalInfo || !addedBy) {
      return res.status(400).json({
        error:
          "Name, ingredients, steps, nutritionalInfo, and addedBy are required",
      });
    }

    for (const ingredient of ingredients) {
      const foodItem = await Food.findById(ingredient.foodItem);
      if (!foodItem) {
        return res.status(400).json({
          error: `Food item with ID ${ingredient.foodItem} does not exist`,
        });
      }
    }

    const newRecipe = new Recipe({
      name,
      description,
      ingredients,
      steps,
      imageUrl,
      nutritionalInfo,
      dietaryTags,
      addedBy,
      sharedWithCommunity,
    });

    const result = await newRecipe.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id)
      .populate("ingredients.foodItem", "name")
      .populate("addedBy", "username");
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      ingredients,
      steps,
      imageUrl,
      nutritionalInfo,
      dietaryTags,
      sharedWithCommunity,
    } = req.body;

    if (!name || !ingredients || !steps || !nutritionalInfo) {
      return res.status(400).json({
        error: "Name, ingredients, steps, and nutritionalInfo are required",
      });
    }

    for (const ingredient of ingredients) {
      const foodItem = await Food.findById(ingredient.foodItem);
      if (!foodItem) {
        return res.status(400).json({
          error: `Food item with ID ${ingredient.foodItem} does not exist`,
        });
      }
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    recipe.name = name;
    recipe.description = description;
    recipe.ingredients = ingredients;
    recipe.steps = steps;
    recipe.imageUrl = imageUrl;
    recipe.nutritionalInfo = nutritionalInfo;
    recipe.dietaryTags = dietaryTags;
    recipe.sharedWithCommunity = sharedWithCommunity;

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Recipe.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Recipe not found" });
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
