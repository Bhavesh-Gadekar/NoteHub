import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";

configDotenv();
const resetPassword=async(req,res)=>{
    const {id,token}=req.params;
    const {password}=req.body;
    try{
        const verify=jwt.verify(token,process.env.SECRET);
        if(id===verify.id){
            const hashPassword=await bcrypt.hash(password,10);
            UserModel.findByIdAndUpdate(id,{password:hashPassword})
            .then(result=>{
                res.json("Password Reset Successfully");
            })
            .catch(err=>{
                console.log(err.message);
            })
        }else{
            return res.json("Invalid User !!");
        }
    }catch(err){
        console.log(err.message);
    }

}

export default resetPassword;