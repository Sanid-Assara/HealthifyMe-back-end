import express from "express";

const uploadRoutes = express.Router();

uploadRoutes.get("/", (req, res) => {
  console.log("Hello World! Home page - Get Req");
  res.send("Hello, World! - Restful API - Get Req");
});

uploadRoutes.post("/", (req, res) => {
  console.log("Hello World! Home page - Post Req");
  res.send("Hello, World! - Restful API - Post Req");
});

export default uploadRoutes;
