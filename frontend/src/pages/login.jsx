import { Link,useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import { useAuth } from "../context/contexProvider";

const Login=()=>{
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');

    const naviagte=useNavigate();
    const {setIsLoggedIn}=useAuth();
    axios.defaults.withCredentials=true;
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!email || !password){
            setMessage("fields cannot be empty !!");
            return console.log("fields cannot be empty !!");
        }
        axios.post(`${import.meta.env.VITE_Server_URL}/login`,{email,password})
        .then(result=>{
            setIsLoggedIn(true);
            naviagte('/home');
        })
        .catch(err=>{
            setMessage(err.response.data);
            console.log(err)
        })
    }

    return(
        <>
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-bl from-cyan-700 via-blue to-violet-500">
            <div className="w-[40%] bg-white/10 backdrop-blur-lg rounded-xl ring-1 ring-white/50 shadow-xl">
                <form onSubmit={handleSubmit} className="w-full h-full space-y-1 mb-3 rounded-xl flex flex-col justify-center items-center">
                    <h1 className="text-2xl my-1 mt-3">Login</h1>
                    <div className="w-full px-10">
                        <h3 className="text-lg ml-2">Email</h3>
                        <input type="text" placeholder="Email" name="email" className="w-full pl-2 h-8 bg-white/30 border rounded-xl" onChange={(e)=>{setEmail(e.target.value),setMessage('')}}/>
                    </div>
                    <div className="w-full px-10">
                        <h3 className="text-lg ml-2">Password</h3>
                        <input type="text" placeholder="Password" name="password" className="w-full pl-2 h-8 bg-white/30 border rounded-xl" onChange={(e)=>{setPassword(e.target.value),setMessage('')}}/>
                        <Link to={'/forgotpassword'} className="ml-2 text-blue-900 underline">Forgot Password ?</Link>
                    </div>
                    <div className="w-full px-10 flex justify-center items-center">
                        <p className="text-md mr-2">Don't have an account ?</p>
                        <Link to={'/signup'} className="text-blue-900 underline mb-2">Sign-up</Link>
                    </div>
                    <div className="w-full px-10 flex flex-col justify-center items-center">
                        <p className="mb-2 text-red-700">{message}</p>
                        <button type="submit" className="w-full border border-blue-800 bg-blue-600 active:bg-blue-500 rounded-xl h-8">Login</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;