import axios from "axios";

import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/contexProvider.jsx";

const Logout=()=>{
    const {setUser,setIsLoggedIn}=useAuth();

    const naviagte=useNavigate();

    axios.defaults.withCredentials=true;
    const handleClick=()=>{
        axios.post(`${import.meta.env.VITE_Server_URL}/logout`)
        .then(()=>{
            setUser(null);
            setIsLoggedIn(false);
            console.log("logged-out Successfully !!")
            naviagte('/login');
    })
        .catch(err=>{
            console.log(err);
        })
    }

    return(
        <>
        <button className="mx-2 my-2 w-15 h-8 bg-blue-600 rounded-xl ring-1 ring-blue-700 cursor-pointer" onClick={handleClick}>Logout</button>
        </>
    )
}

export default Logout;