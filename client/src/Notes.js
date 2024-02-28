import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

const Notes = ({ groups }) => {
  const [notes, setNotes] = useState([]);

  const handleSendClick = async (newNote) => {
    try {
      const groupId = groups.length > 0 ? groups[0]._id : null;
      const response = await fetch(
        `http://localhost:5000/groups/${groupId}/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newNote.text }),
        }
      );

      const data = await response.json();
      console.log("Note created:", data);
    } catch (error) {
      console.error("Error creating note:", error);
    }

    setNotes([...notes, newNote]);
  };

  return (
    <div>
      <div className="flex flex-justify items-center p-4 bg-info">
        <div className="bg-red-200 rounded-full h-12 w-12 flex items-center justify-center text-center text-xl text-slate-800">
          M.N
        </div>
        <p className="ml-4 text-2xl text-primary">My Notes</p>
      </div>
      <div className="p-8 bg-accent">
        {/* maps the notes */}
        {notes.map((note, index) => (
          <div key={index} className="bg-primary p-8 pb-4 mb-4">
            <p>{note.text}</p>
            <p className="text-neutral text-right font-medium mt-4">
              {note.date}
            </p>
          </div>
        ))}
       
      </div>
      <div className="absolute bottom-0 w-9/12">
        <div className="bg-info py-3 px-6 relative">
          <input
            type="text"
            placeholder="Enter the text here...."
            className="p-4 h-24 w-full rounded-md"
          />
          <button
            className="absolute bottom-4 right-8"
            onClick={() => {
              const newNote = {
                text: document.querySelector(".bg-info input").value,
                timestamp: new Date().toLocaleString(),
              };
              handleSendClick(newNote);
            }}
          >
            <IoMdSend fill="#ABABAB" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
