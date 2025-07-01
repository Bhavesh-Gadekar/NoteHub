import UserModel from "../models/UserModel.js";

const getuser=(req,res)=>{
    const id=req.params.id;
    UserModel.findById(id)
    .then(user=>{
        res.json(user);
    })
    .catch(err=>{
        console.log(err.message);
    })
}

export default getuser;