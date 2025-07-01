import NoteModel from "../models/NoteModel.js";

const deleteNote=(req,res)=>{
    const{id}=req.params;
    // console.log(id);
    NoteModel.findByIdAndDelete(id)
    .then(result=>{
        res.json("success")
    })
    .catch(err=>{
        res.json(err.message);
    });
}

export default deleteNote;