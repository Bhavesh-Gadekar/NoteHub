import Logout from "../pages/logout.jsx";
import { useAuth } from "../context/contexProvider.jsx";
import CreateNoteCard from "./createNoteCard.jsx";
import { useState } from "react";
import Cookie from "js-cookie";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Navbar = ({ className, onNoteAdded, query, setQuery,setClicked,clicked }) => {

    const { user } = useAuth();
    const token = Cookie.get("token");
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [image, setimage] = useState(null);
    // const [clicked, setClicked] = useState(false);

    const handleUpload = (e) => {
        // console.log(file);
        const formdata = new FormData();
        formdata.append('file', file)
        axios.post(`${import.meta.env.VITE_Server_URL}/upload`, formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
            .then(result => {
                // console.log(result);
                setimage(result.data.image);
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const handleClick = () => {
        setClicked((prevState) => !prevState);
    }

    const handleDelete = (e) => {
        axios.delete(`${import.meta.env.VITE_Server_URL}/deleteuser`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(result => {
                // console.log(result);
                setClicked(false);
                navigate('/signup');
            })
            .catch(err => {
                console.log(err);
            })
    }

    // useEffect(() => {
    //     axios.get(`${import.meta.env.VITE_Server_URL}/pic`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         }
    //     })
    //         .then((result) => {
    //             // console.log(result);
    //             setimage(result.data.image);
    //             // console.log(result.data.image);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     // console.log(image);
    // }, [file]);

    return (
        <>
            {clicked && ReactDOM.createPortal
                (
                    <div className="h-55 w-74 rounded-xl mt-4 py-2 flex flex-col justify-between items-center bg-white/10 shadow-lg ring-1 ring-white/90 backdrop-blur-xl absolute top-10 right-1 z-50">
                        <div className="w-full flex flex-col justify-center items-center">
                            <span onClick={() => { setClicked(false) }} className="w-full text-end pr-4 text-bold text-xl cursor-pointer">x</span>
                            <h1 className="text-xl font-bold">Welcome</h1>
                            <h1 className="text-lg font-bold">{user}</h1>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center space-y-2">
                            <h1 className="text-lg">Change profile pic ?</h1>
                            <div className="flex justify-center items-center space-x-6">
                                <input onChange={(e) => setFile(e.target.files[0])} type="file" className="w-[60%] text-sm mb-2 text-white bg-transparent file:p-1 file:rounded-md file:border-1 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30 cursor-pointer" />
                                <button onClick={handleUpload} className="bg-gray-600 rounded-xl text-center p-1 px-1 cursor-pointer">Upload</button>
                            </div>
                        </div>
                        <div className="w-full px-3 flex justify-center items-center">
                            <button className="w-full bg-red-600 rounded-xl text-center p-1 px-1 cursor-pointer" onClick={handleDelete}>Delete Account</button>
                        </div>
                    </div>,
                    document.body
                )
            }
            <div className={`w-full flex flex-col justify-center items-center ${className}`}>
                <div className="w-full flex justify-between pl-5 pr-5 items-center bg-white/10 ring-1 m-1 rounded-xl ring-white/50 backdrop-blur-lg">
                    <h1 className="font-bold text-3xl text-center pl-1">NoteHub</h1>
                    <h2 className="text-xl font-bold">Welcome {user}</h2>
                    <div className="flex justify-around items-center">
                        <Logout />
                        <div onClick={handleClick} className="w-9 h-9  bg-cover bg-center ml-1 rounded-full bg-white border text-center cursor-pointer"
                            style={{ backgroundImage: `url(${import.meta.env.VITE_Server_URL}/images/${image})` }} >
                            {/* <img src={`http://localhost:3000/images/${image}`} /> */}
                        </div>
                    </div>
                </div>
                <div onClick={() => { setClicked(false) }} className="w-full my-1 flex justify-between items-center px-2">
                    <div className="w-full lg:ml-27 md:ml-20 sm:ml-0 flex justify-center items-center">
                        <input
                            className="lg:w-[50%] md:w-[70%] sm:w-[100%] self-center h-9 ml-5 bg-white/10 pl-2 ring-1 ring-white/50 rounded-xl"
                            type="search"
                            placeholder="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <CreateNoteCard onNoteAdded={onNoteAdded} />
                </div>

            </div>
        </>
    )
}

export default Navbar;