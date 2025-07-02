import UserModel from "../models/UserModel.js";
import PicModel from "../models/PicModel.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const deleteuser = async (req, res) => {
    try {
        const token = req.cookies.token;
        // const token = req.headers['authorization']?.split(' ')[1];
        // console.log(token);
        const user = jwt.verify(token, process.env.SECRET);

        // Step 1: Find and delete all user's images
        const images = await PicModel.find({ userId: user.id });
        
        if(images.image){
        for (const img of images) {
            const imagePath = path.join('public','images', img.image); // adjust path if different
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // delete file from server
            }
        }}

        await PicModel.deleteMany({ userId: user.id }); // delete from DB

        // Step 2: Delete user
        await UserModel.findByIdAndDelete(user.id);

        res.json("User and associated images deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Deletion failed", details: err.message });
    }
};

export default deleteuser;
