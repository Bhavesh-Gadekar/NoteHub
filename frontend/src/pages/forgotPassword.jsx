import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Forgotpassword=()=>{

    const [email,setEmail]=useState('');
    const [message,setMessage]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!email){
            return setMessage("Fields should not be Empty !")
        }
        axios.post(`${import.meta.env.VITE_Server_URL}/forgotpassword`,{email})
        .then(result=>{
            setMessage(result.data);
            // console.log(result);
        })
        .catch(err=>{
            setMessage(err.message);
            console.log(err.message);
        })
    }

    return(
        <>
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-bl from-cyan-700 via-blue to-violet-500">
            <div className="w-[85%] sm:w-[60%] md:w-[40%] bg-white/10 backdrop-blur-lg rounded-xl ring-1 ring-white/50 shadow-xl">
                <form onSubmit={handleSubmit} className="w-full h-full space-y-1 mb-3 rounded-xl flex flex-col justify-center items-center">
                    <h1 className="text-2xl my-1 mt-3">Forgot Password</h1>
                    <div className="w-full px-10">
                        <h3 className="text-lg ml-2">Email</h3>
                        <input type="text" placeholder="Email" name="email" className="w-full pl-2 h-8 bg-white/30 border rounded-xl" onChange={(e)=>{setEmail(e.target.value)}}/>
                        <p className="mb-2 p-2">A link will be sent to {email} to reset the password .Click on Send Email to sent Email !!</p>
                        {/* <p className="mb-2 text-red-700 text-center">{message}</p> */}
                        {message==="success"?<p className="mb-2 text-green-700 text-center">Email send to {email} !!</p>:<p className="mb-2 text-red-700 text-center">{message}</p>}
                    </div>
                    <div className="w-full px-10 py-1 flex flex-col justify-center items-center">
                        <div className="w-full flex justify-between items-center">
                        <Link to={'/login'} className="w-[40%] text-center pt-1 border border-blue-800 bg-blue-600 active:bg-blue-500 rounded-xl h-8">Cancel</Link>
                        <button type="submit" className="w-[40%] border border-blue-800 bg-blue-600 active:bg-blue-500 rounded-xl h-8">Send Email</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Forgotpassword;