import UserModel from "../models/UserModel.js";
import PicModel from "../models/PicModel.js"; // Import PicModel to create the associated profile pic
import bcrypt from "bcrypt";

const signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    
    try {
        // Create the user first
        const user = await UserModel.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
        });
        
        // Now create the corresponding PicModel for the user
        await PicModel.create({
            userId: user._id, // Link the PicModel to the user by userId
            image: "" // No image initially
        });
        
        res.json("success");
    } catch (err) {
        console.log(err);
        res.status(500).json("Error creating user and profile.");
    }
};

export default signup;
