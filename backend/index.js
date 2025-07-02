// import cors from "cors";
// import express from "express";
// import connectdb from "./db.js";
// import { configDotenv } from "dotenv";
// import cookieParser from "cookie-parser";
// import signup from "./controllers/signup.js";
// import login from "./controllers/login.js";
// import logout from "./controllers/logout.js";
// import VerifyUser from "./middleware/VerifyUser.js";
// import forgotpassword from "./controllers/forgotPassword.js";
// import resetPassword from "./controllers/resetPassword.js";
// import getuser from "./controllers/getuser.js";
// import userDetail from "./controllers/userDetail.js";
// import addnote from "./controllers/addnote.js";
// import allnotes from "./controllers/allnotes.js";
// import deleteNote from "./controllers/deleteNote.js";
// import updatenote from "./controllers/updatenotes.js";
// import deleteuser from "./controllers/deleteuser.js";
// import multer from "multer";
// import path from "path";
// import uploadFile from "./controllers/uploadFile.js"
// import picphoto from "./controllers/picphoto.js";

// const app=express();
// configDotenv();
// connectdb();

// app.use(cors({
//     // origin:['https://notehubb.netlify.app'],
//     origin:['http://localhost:5173'],
//     credentials:true,
//     methods:["GET","POST","DELETE"]
// }))
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static('public'))

// // Protected Routes :-
// app.get('/home',VerifyUser, (req, res) => {
//     // res.status(200).send({ message: "This is a protected home route" });
// });

// // auth Routes :-
// app.get('/getuser/:id',getuser);
// app.post('/signup',signup);
// app.post('/login',login);
// app.post('/logout',logout);
// app.delete('/deleteuser',deleteuser);
// app.post('/forgotpassword',forgotpassword);
// app.post('/resetpassword/:id/:token',resetPassword);

// //for context :-
// app.get('/userdetail',userDetail);

// // notes route :-
// app.post('/addnote',addnote);
// app.get('/notes',allnotes);
// app.post('/editnote/:id',updatenote);
// app.delete('/delete/:id',deleteNote);

// //Upload profile pic :-
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'public/images');
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
//     }
// })
// const upload= multer({
//     storage:storage
// })

// app.post('/upload',upload.single('file'),uploadFile);
// app.get('/pic',picphoto);


// app.listen(process.env.PORT,()=>{
//     console.log(`Server Running on PORT ${process.env.PORT}`)
// });
import express from "express";
import cors from "cors";
import path from "path";
import multer from "multer";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Import DB and Controllers
import connectdb from "./db.js";
import signup from "./controllers/signup.js";
import login from "./controllers/login.js";
import logout from "./controllers/logout.js";
import VerifyUser from "./middleware/VerifyUser.js";
import forgotpassword from "./controllers/forgotPassword.js";
import resetPassword from "./controllers/resetPassword.js";
import getuser from "./controllers/getuser.js";
import userDetail from "./controllers/userDetail.js";
import addnote from "./controllers/addnote.js";
import allnotes from "./controllers/allnotes.js";
import deleteNote from "./controllers/deleteNote.js";
import updatenote from "./controllers/updatenotes.js";
import deleteuser from "./controllers/deleteuser.js";
import uploadFile from "./controllers/uploadFile.js";
import picphoto from "./controllers/picphoto.js";

const app = express();
configDotenv();
connectdb();

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS config
app.use(cors({
  origin: ["http://localhost:5173", "https://notehubb.netlify.app"], // ✅ include both for dev + prod
  credentials: true,
  methods: ["GET", "POST", "DELETE"]
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Serve static images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", logout);
app.get("/getuser/:id", getuser);
app.get("/userdetail", userDetail);
app.post("/forgotpassword", forgotpassword);
app.post("/resetpassword/:id/:token", resetPassword);
app.delete("/deleteuser", deleteuser);

// Notes
app.post("/addnote", addnote);
app.get("/notes", allnotes);
app.post("/editnote/:id", updatenote);
app.delete("/delete/:id", deleteNote);

// Image upload + fetch
app.post("/upload", upload.single("file"), uploadFile);
app.get("/pic", picphoto);

// Optional: protected route test
app.get("/home", VerifyUser, (req, res) => {
  res.status(200).json({ message: "Protected route" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running on PORT ${process.env.PORT}`);
});
