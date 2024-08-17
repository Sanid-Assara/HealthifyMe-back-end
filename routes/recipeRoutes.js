import express from "express";

const getRecipes = async (req, res) => {
  try {
    res.send("get request for recipes");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRecipe = async (req, res) => {
  try {
    res.send("post request for a recipe");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    res.send("get request for a single recipe");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    res.send("put request for a recipe");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    res.send("delete request for a recipe");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recipeRoutes = express.Router();

recipeRoutes.get("/", getRecipes);
recipeRoutes.post("/", createRecipe);
recipeRoutes.get("/:id", getRecipe);
recipeRoutes.put("/:id", updateRecipe);
recipeRoutes.delete("/:id", deleteRecipe);

export default recipeRoutes;
