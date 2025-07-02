import PicModel from "../models/PicModel.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const uploadFile = async (req, res) => {
  try {
    const token = req.cookies.token;
    // const token = req.headers['authorization']?.split(' ')[1];
    const userdetail = jwt.verify(token, process.env.SECRET);
    const userId = userdetail.id;

    // Check for existing image
    const existing = await PicModel.findOne({ userId });

    // Delete old image file if exists
    if (existing?.image) {
      const oldImagePath = path.join('public', 'images', existing.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        } else {
          console.log("Old image deleted successfully.");
        }
      });
    }

    // Save or update new image
    const result = await PicModel.findOneAndUpdate(
      { userId },
      { image: req.file.filename },
      { new: true, upsert: true }
    );

    res.json(result);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json("Error uploading image.");
  }
};

export default uploadFile;
