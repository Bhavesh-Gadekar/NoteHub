import NoteModel from "../models/NoteModel.js";

const updatenote=(req,res)=>{
    const {id}=req.params;
    const {title,description}=req.body;
    // console.log(id);
    NoteModel.findByIdAndUpdate(id,{title,description})
    .then(()=>{
        res.json("Success");
    })
    .catch(err=>{
        res.json(err.message);
    })
}

export default updatenote;