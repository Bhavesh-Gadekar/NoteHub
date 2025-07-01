import jwt from "jsonwebtoken";
import NoteModel from "../models/NoteModel.js";

const allnotes=(req,res)=>{
    // get token collect id and then search notes on based on that id
    const token=req.headers['authorization']?.split(' ')[1];
    const user=jwt.verify(token,process.env.SECRET);
    // console.log(user.id);
    NoteModel.find({userId:user.id})
    .then(notes=>{
        res.json(notes);
    })
    .catch(err=>{
        res.json(err.message);
    })
}

export default allnotes;