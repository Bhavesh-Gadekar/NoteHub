import react, { createContext,useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";

axios.defaults.withCredentials=true;
const authContext=createContext();
const ContexProvider=({children})=>{

    const [user,setUser]=useState(null);
    const [isloggedin,setIsLoggedIn]=useState(false);
    const token=Cookie.get("token");
    // console.log(token)
    
    useEffect(()=>{
        if(isloggedin){
            axios.get(`${import.meta.env.VITE_Server_URL}/userdetail`,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        .then(result=>{
            // console.log(result);
            setUser(result.data);
        })
        .catch(err=>{
            setUser(null);
            console.log(err.message);
        })
        }
    },[isloggedin]);
    
    return(
        <authContext.Provider value={{user,setUser,setIsLoggedIn}}>{children}</authContext.Provider>
    )
}

export const useAuth=()=>useContext(authContext);
export default ContexProvider;