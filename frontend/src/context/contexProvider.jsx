import react, { createContext,useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";

const authContext=createContext();
const ContexProvider=({children})=>{

    const [user,setUser]=useState(null);
    
    useEffect(()=>{
        const token=Cookie.get("token");
        if(!token){
            return setUser('');
        }
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
            console.log(err.message);
        })
    },[]);
    
    return(
        <authContext.Provider value={{user}}>{children}</authContext.Provider>
    )
}

export const useAuth=()=>useContext(authContext);
export default ContexProvider;