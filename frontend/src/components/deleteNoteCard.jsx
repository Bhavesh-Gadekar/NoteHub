import axios from "axios";
import ReactDOM from "react-dom";
import { useState } from "react";
import img1 from '../img/bin.png';

const DeleteNoteCard = ({ NoteID, onNoteDeleted }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        console.log(NoteID);
        axios.delete(`${import.meta.env.VITE_Server_URL}/delete/${NoteID}`)
        .then((result) => {
            setShowConfirm(false);
            if (onNoteDeleted) onNoteDeleted();
            console.log(result);
        })
        .catch(err => {
            console.error("Error deleting note:", err);
        });
    };

    return (
        <>
            <span 
                onClick={() => setShowConfirm(true)} 
                className="text-lg font-bold cursor-pointer text-red-500"
                title="Delete note"
            >
                <img src={img1} alt="Description" className="w-5 h-5" />
            </span>

            {/* Render modal at root level if true */}
            {showConfirm &&
                ReactDOM.createPortal
                (
                    <div className="fixed inset-0 z-50 flex justify-center items-center bg-white/10 backdrop-blur-[4px]">
                        <div className="bg-white/10 rounded-xl shadow-lg p-6 w-[300px] text-black ring-1 ring-white/50">
                            <h2 className="text-xl font-semibold mb-2">Delete Note?</h2>
                            <p className="mb-4">Are you sure you want to delete this note?</p>
                            <div className="flex justify-between gap-3">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 bg-gray-300 text-black cursor-pointer rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white cursor-pointer rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>,
    document.body
                )
            }
        </>
    );
};

export default DeleteNoteCard;
