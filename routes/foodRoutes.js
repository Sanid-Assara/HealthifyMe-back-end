import express from "express";

const getFoods = async (req, res) => {
  try {
    res.send("get request for foods");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFood = async (req, res) => {
  try {
    res.send("post request for a food");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFood = async (req, res) => {
  try {
    res.send("get request for a single food");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    res.send("put request for a food");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    res.send("delete request for a food");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const foodRoutes = express.Router();

foodRoutes.get("/", getFoods);
foodRoutes.post("/", createFood);
foodRoutes.get("/:id", getFood);
foodRoutes.put("/:id", updateFood);
foodRoutes.delete("/:id", deleteFood);

export default foodRoutes;
