import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken"; 
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";

configDotenv();
const login=async (req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(404).json("No User Found !!");
        }
        const verify=await bcrypt.compare(password,user.password);
        if(!verify){

            return res.status(400).json("Invalid Credentials !!");
        }
        // console.log(user);
        const token=jwt.sign({id:user._id,firstname:user.firstname,email,},process.env.SECRET,{expiresIn:'1h'});
        res.cookie("token",token);
        res.json(user);
    }catch(err){
        console.log(err)
    }
}

export default login;