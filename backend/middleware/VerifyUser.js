import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();
const VerifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("Notoken");
    }
    try{
    jwt.verify(token, process.env.SECRET,(err,decoded)=>{
         if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = decoded;
        next();
    })}catch(err){
        res.json(err.message);
    }
}

export default VerifyUser;