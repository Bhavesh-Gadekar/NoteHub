import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword=()=>{
    const navigate=useNavigate();
    const {id,token}=useParams();
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');
    const [email,setEmail]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!password){
            return setMessage('Fields cannot be Empty !!');
        }
        axios.post(`${import.meta.env.VITE_Server_URL}/resetpassword/${id}/${token}`,{password})
        .then(user=>{
            // console.log(res);
            navigate('/login');
        })
        .catch(err=>{
            setMessage(err.message);
            console.log(err.message);
        })
    }

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_Server_URL}/getuser/${id}`)
        .then(user=>{
            setEmail(user.data.email);
        })
        .catch(err=>{
            console.log(err.message);
        })
    },[]);

    return(
        <>
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-bl from-cyan-700 via-blue to-violet-500">
            <div className="w-[85%] sm:w-[60%] md:w-[40%] bg-white/10 backdrop-blur-lg rounded-xl ring-1 ring-white/50 shadow-xl">
                <form onSubmit={handleSubmit} className="w-full h-full space-y-1 mb-3 rounded-xl flex flex-col justify-center items-center">
                    <h1 className="text-2xl my-1 mt-3">Reset Password</h1>
                    <div className="w-full px-10">
                        <h3 className="text-lg ml-2">Email</h3>
                        <input type="text" placeholder="Email" name="email" className="w-full pl-2 h-8 bg-white/30 border rounded-xl" value={email}/>
                    </div>
                    <div className="w-full px-10">
                        <h3 className="text-lg ml-2">Password</h3>
                        <input type="text" placeholder="Password" name="password" className="w-full pl-2 h-8 bg-white/30 border rounded-xl" onChange={(e)=>{setPassword(e.target.value); setMessage('')}}/>
                    </div>
                    <div className="w-full px-10 flex flex-col justify-center items-center">
                        <p className="mb-2 text-red-700">{message}</p>
                        <button type="submit" className="w-full border border-blue-800 bg-blue-600 active:bg-blue-500 rounded-xl h-8">Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default ResetPassword;