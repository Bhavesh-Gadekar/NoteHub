import mongoose from "mongoose";

const NoteSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String,
        maxlength:30
    },
    description:{
        required:true,
        type:String,
        maxlength:100
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // This links to the "users" collection (the UserModel)
        required: true,
    }
});

const NoteModel=mongoose.model('notes',NoteSchema);
export default NoteModel;
