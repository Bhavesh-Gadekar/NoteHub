import PicModel from "../models/PicModel.js";
import jwt from "jsonwebtoken";

const picphoto=(req,res)=>{
    const token = req.cookies.token;
    console.log(token);
    // const token=req.headers['authorization']?.split(' ')[1];
    // console.log(token,"this is from picphoto")
    if (!token) return res.status(401).json({ message: 'Token missing' });
    const userdetail=jwt.verify(token,process.env.SECRET);
    // console.log(userdetail.id);
    PicModel.findOne({userId:userdetail.id})
    .then(result=>{
        res.json(result);
        // console.log(result);
    })
    .catch(err=>{
        console.log(err.message);
    })
}

export default picphoto;