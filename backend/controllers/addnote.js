import NoteModel from "../models/NoteModel.js";
import jwt from "jsonwebtoken";

const addnote=(req,res)=>{
    const {title,description}=req.body;
    const token = req.cookies.token;
    // const token=req.headers['authorization']?.split(' ')[1];
    const userdetail=jwt.verify(token,process.env.SECRET);
    // console.log(userdetail);
    const user=NoteModel.create({title,description,userId:userdetail.id})
    .then(result=>{
        res.json("success");
    })
    .catch(err=>{
        res.json(err.message);
        // console.log(err.message);
    })
}

export default addnote;