import Recipe from "../models/recipeModel.js";
import Ingredient from "../models/ingredientModel.js";

export const getRecipes = async (req, res) => {
  try {
    let recipes = await Recipe.find()
      .populate({
        path: "ingredients.ingredientItem",
        select: "name imageUrl",
      })
      .populate({
        path: "addedBy",
        select:
          "profilePicture firstname lastname email dietaryPreferences location",
      });
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
    } = req.body;

    if (!name || !ingredients || !steps || !nutritionalInfo || !addedBy) {
      return res.status(400).json({
        error:
          "Name, ingredients, steps, nutritionalInfo, and addedBy are required",
      });
    }

    for (const ingredient of ingredients) {
      const ingredientItem = await Ingredient.findById(
        ingredient.ingredientItem
      );
      if (!ingredientItem) {
        return res.status(400).json({
          error: `Ingredient item with ID ${ingredient.ingredientItem} does not exist`,
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
      .populate({
        path: "ingredients.ingredientItem",
        select: "name imageUrl",
      })
      .populate({
        path: "addedBy",
        select:
          "profilePicture firstname lastname email dietaryPreferences location",
      });
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
    } = req.body;

    if (!name || !ingredients || !steps || !nutritionalInfo) {
      return res.status(400).json({
        error: "Name, ingredients, steps, and nutritionalInfo are required",
      });
    }

    for (const ingredient of ingredients) {
      const ingredientItem = await Ingredient.findById(
        ingredient.ingredientItem
      );
      if (!ingredientItem) {
        return res.status(400).json({
          error: `Ingredient item with ID ${ingredient.ingredientItem} does not exist`,
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
