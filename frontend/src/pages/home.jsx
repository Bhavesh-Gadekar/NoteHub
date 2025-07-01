import axios from "axios";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Body from "../components/body.jsx";

axios.defaults.withCredentials=true;
const Home = () => {

    const [Notes,setNotes]=useState([]);
    const [query, setQuery] = useState("");
    const token=Cookie.get("token");
    const [clicked, setClicked] = useState(false);
    const navigate=useNavigate();

    const fetchNotes=()=>{
        axios.get(`${import.meta.env.VITE_Server_URL}/notes`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((notes)=>{
            setNotes(notes.data);
            // console.log(notes.data);
        })
        .catch(err => {
                console.log(err.message);
            })
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_Server_URL}/home`)
            .then(result => {
                if (result.data === 'Notoken') {
                    console.log("No Token Found !");
                    navigate('/login');
                }
                console.log(result);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    useEffect(() => {
        if (token) fetchNotes();
    }, [token]);

    return (
        <>
            <div className="z-50 w-full min-h-screen flex justify-center items-start bg-gradient-to-bl from-cyan-700 via-blue to-violet-500">
                <div className="w-full min-h-screen flex flex-col justify-start items-center">
                <Navbar className={"p-1"} setClicked={setClicked} clicked={clicked} onNoteAdded={fetchNotes} query={query} setQuery={setQuery}/>
                <Body className={""} setClicked={setClicked} Notes={Notes} query={query} onNoteDeleted={fetchNotes} onNoteUpdate={fetchNotes}/>
                </div>
            </div>
        </>
    )
}

export default Home;