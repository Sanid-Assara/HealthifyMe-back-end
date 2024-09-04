import fs from "fs";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const cloudinaryUpload = async (req, res, next) => {
  try {
    const { file } = req;
    const result = await cloudinary.v2.uploader.upload(file.path);
    console.log(result.secure_url);
    const localPath = file.path;
    console.log(localPath);
    req.file = result;
    console.log(result);
    // fs.unlink(localPath);

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
};

// module.exports = cloudinary;
