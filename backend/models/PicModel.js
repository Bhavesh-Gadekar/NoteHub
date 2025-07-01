import mongoose from "mongoose";

const PicSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // This links to the "users" collection (the UserModel)
        required: true,
    },
    image:{
        type:String,
    }

});

const PicModel=mongoose.model('profilepic',PicSchema);
export default PicModel;
