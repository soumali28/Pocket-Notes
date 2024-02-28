import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";

const Notes = ({ groups, groupId }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes based on the groupId when the component mounts or groupId changes
    const fetchNotes = async () => {
      try {
        const response = await fetch(`https://navy-blue-barracuda-slip.cyclic.app/groups/${groupId}`);
        const data = await response.json();
        console.log(data,'notes data')
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [groupId]);

  const handleSendClick = async (newNote) => {
    try {
      //const groupId = groups.length > 0 ? groups[0]._id : null;
      const response = await fetch(
        `https://navy-blue-barracuda-slip.cyclic.app/groups/${groupId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newNote.text, date: newNote.timestamp }),
        }
      );
  
      const data = await response.json();
      console.log("Note created:", data);
      // Update the state only after successful response
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
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
      <div className="relative bottom-0 w-9/12">
        <div className="bg-info py-3 px-6 relative">
          {/* <input
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
          </button> */}
          <input
            type="text"
            placeholder="Enter the text here...."
            className="p-4 h-24 w-full rounded-md"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const newNote = {
                  text: e.target.value,
                  timestamp: new Date().toLocaleString(),
                };
                handleSendClick(newNote);
              }
            }}
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
            {/* Button content */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
