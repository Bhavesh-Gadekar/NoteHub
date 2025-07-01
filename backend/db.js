import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const connectdb=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(
        console.log("DB connected SuccessFullyy !!")
    )
    .catch(err=>{
        console.log(err);
    })
}

export default connectdb;