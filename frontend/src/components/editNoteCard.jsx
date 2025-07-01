import axios from "axios";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import img2 from "../img/compose.png";

const EditNoteCard = ({ NoteData,NoteID,onNoteUpdate }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            setMessage("fields cannot be empty !!");
            return console.log("fields cannot be empty !!");
        }
        axios.post(`${import.meta.env.VITE_Server_URL}/editnote/${NoteID}`, { title, description })
            .then(() => {
                setShowConfirm(false);
                setTitle('');
                setDescription('');
                if (onNoteUpdate) onNoteUpdate();
            })
            .catch(err => {
                setMessage(err.response?.data || "Error occurred");
                console.log(err)
            })
    }

    useEffect(()=>{
        setTitle(NoteData.title || "");
        setDescription(NoteData.description || "");
    },[NoteData]);

    return (
        <>
            <span 
                onClick={() => setShowConfirm(true)} 
                className="text-lg font-bold cursor-pointer text-red-500"
                title="Delete note"
            >
                <img src={img2} alt="Description" className="w-5 h-5" />
            </span>

            {showConfirm && ReactDOM.createPortal(
                    <div className="fixed inset-0 backdrop-blur-[4px] z-10 flex justify-center items-center">
                        <div className="bg-white/15 rounded ring-1 ring-white/60 p-2 rounded-xl shadow-lg w-1/3">
                            <form onSubmit={handleSubmit} className="w-full h-full space-y-1 mb-2 rounded-xl flex flex-col justify-center items-center">
                                <h2 className="text-2xl font-semibold mb-4">Update Note</h2>
                                <div className="w-full px-10">
                                    <h3 className="text-lg ml-2">Title</h3>
                                    <input onChange={(e) => { setTitle(e.target.value), setMessage('') }}
                                        type="text" placeholder="Title" name="title" value={title}
                                        className="w-full pl-2 h-8 bg-white/30 border rounded-xl border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ease-in-out placeholder:text-gray-500" />
                                </div>
                                <div className="w-full px-10">
                                    <h3 className="text-lg ml-2">Description</h3>
                                    <textarea
                                        type="text"
                                        placeholder="Description"
                                        name="description" value={description}
                                        className="w-full pl-3 pr-3 pb-17 bg-white/30 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ease-in-out placeholder:text-gray-500"
                                        onChange={(e) => { setDescription(e.target.value), setMessage('') }} />
                                </div>
                                <div className="w-full flex flex-col justify-between items-center">
                                    <p className="text-red-700 my-1">{message}</p>
                                    <div className="w-full px-10 flex justify-between items-center">
                                        <button onClick={() => setShowConfirm(false)} className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg">Close</button>
                                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-lg">Update Note</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>,
    document.body
            )}
        </>
    )
}

export default EditNoteCard;