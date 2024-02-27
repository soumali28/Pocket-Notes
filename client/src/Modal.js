import React, { useState, useEffect, useRef } from "react";

function CustomModal({ isOpen, onRequestClose, onCreateGroup }) {
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("#16008B");
  const modalRef = useRef();

  const handleGroupColorChange = (color) => {
    setGroupColor(color);
  };

  const handleCreateGroup = () => {
    // Add logic to handle the creation of the group with groupName and groupColor
    console.log("Group Name:", groupName);
    console.log("Group Color:", groupColor);

    // Close the modal after handling the group creation
    onRequestClose();
  };

  const handleCloseModal = (e) => {
    // Close the modal if clicking outside of it
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onRequestClose();
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside the modal
    document.addEventListener("mousedown", handleCloseModal);

    return () => {
      // Remove event listener on component unmount
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, []);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center`}
    >
      <div ref={modalRef} className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create a New Group</h2>
        <div className="flex justify-center items-center">
          <label htmlFor="groupName" className="block">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="w-full p-2 border border-gray-300 rounded-full"
          />
        </div>
        <div className="flex justify-center items-center">
          <label className="block mt-4 mb-2">Choose Color</label>
          <div className="flex cursor-pointer">
            {[
              "#B38BFA",
              "#FF79F2",
              "#43E6FC",
              "#F19576",
              "#0047FF",
              "#6691FF",
            ].map((color, index) => (
              <div
                key={index}
                className={`color-option rounded-full w-6 h-6 mx-1 ${
                  groupColor === color ? "border border-slate-800" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleGroupColorChange(color)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleCreateGroup}
            className="bg-secondary text-primary py-2 px-4 text-md rounded mr-2"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
