import express from "express";
import { upload } from "../middlewares/imgUpload.js";

const PORT = process.env.PORT ?? 8080;

const uploadRoutes = express.Router();

uploadRoutes.get("/", (req, res) => {
  console.log("Hello World! Home page - Get Req");
  res.send("Hello, World! - Restful API - Get Req");
});

uploadRoutes.post("/", upload.single("avatar"), (req, res) => {
  console.log(req.file, req.body);
  res.send({
    ...req.file,
    destination: `http://localhost:${PORT}/${req.file.path.split("\\")[1]}`,
  });
});

export default uploadRoutes;
