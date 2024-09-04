import express from "express";
import { upload } from "../middlewares/imgUpload.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";

const PORT = process.env.PORT ?? 8080;

const uploadRoutes = express.Router();

uploadRoutes.post("/", upload.single("image"), cloudinaryUpload, (req, res) => {
  try {
    console.log(req.file, req.body);
    res.send({
      ...req.file,
      // destination: `http://localhost:${PORT}/${req.file.path.split("\\")[1]}`,
    });
  } catch (error) {
    console.log(error);
  }
});

export default uploadRoutes;
