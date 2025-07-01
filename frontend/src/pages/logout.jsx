import axios from "axios";
import {useNavigate} from "react-router-dom";

const Logout=()=>{

    const naviagte=useNavigate();

    axios.defaults.withCredentials=true;
    const handleClick=()=>{
        axios.post(`${import.meta.env.VITE_Server_URL}/logout`)
        .then(()=>{
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