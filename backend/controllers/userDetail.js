import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const userDetail=(req,res)=>{
    const token = req.cookies.token;
    // const token=req.headers['authorization']?.split(' ')[1];
    const user=jwt.verify(token,process.env.SECRET);
    res.json(user.firstname);
}

export default userDetail;