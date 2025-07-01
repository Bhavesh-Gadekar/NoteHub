import DeleteNoteCard from "./deleteNoteCard";
import EditNoteCard from "./editNoteCard";
import { useState,useEffect } from "react";

const Body = ({ className, Notes, onNoteDeleted,onNoteUpdate,query,setClicked  }) => {


  const [filteredNotes, setFilteredNotes] = useState(Notes)

  useEffect(() => {
    const result = Notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(result);
  }, [query, Notes]);

  return (
    <>
      <div onClick={()=>{setClicked(false)}} className={`w-[99%] min-h-screen mb-2 flex justify-center items-start bg-white/10 backdrop-blur-lg ring-1 rounded-xl ring-white/50 ${className}`}>
        {Notes.length === 0 ? (
          <div className="w-full flex justify-center items-center text-xl text-black mt-10">
            Create new note
          </div>
        ) : (
          <div className="w-full mt-4 grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 justify-items-center items-start">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="flex flex-col justify-start h-35 my-3 w-70 pl-2 pt-2 bg-white/10 backdrop-blur-lg rounded-xl ring-1 ring-white/50 overflow-auto break-words">
                <div>
                  <h3 className="text-center underline text-lg my-1">{note.title}</h3>
                  <h4 className="text-center text-md pr-1 mt-1">{note.description}</h4>
                </div>
                <div className="mt-auto flex space-x-1 self-end pr-2 pb-1">
                  <EditNoteCard  NoteData={{'title':note.title,'description':note.description}} NoteID={note._id} onNoteUpdate={onNoteUpdate}/>
                  <DeleteNoteCard NoteID={note._id} onNoteDeleted={onNoteDeleted} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Body;
