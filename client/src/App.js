import Image from "./images/image-removebg-preview 1.png";
import { MdEnhancedEncryption, MdAddCircle } from "react-icons/md";
import CustomModal from "./Modal";
import { useEffect, useState } from "react";
import Notes from "./Notes";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNoteOpen, setNoteOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [group_Id, setGroupId]  = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openNotes = async (groupId) => {
    console.log("Opened modal for Group ID:", groupId);
    setGroupId(groupId);
    setNoteOpen(true);
    try {
      // Fetch group chats using the group ID
      const response = await fetch(`https://red-dalmatian-kit.cyclic.app/groups/${groupId}`);
      const data = await response.json();
      const filteredChats = data.filter(chat => chat.groupId === groupId);
      console.log("Filtered Group Chats:", filteredChats);
      setNoteOpen(true);
    } catch (error) {
      console.error("Error fetching group chats:", error);
    }
  };
  const fetchGroups = async () => {
    try {
      const response = await fetch("https://red-dalmatian-kit.cyclic.app/groups");
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const generateInitials = (groupName) => {
    const words = groupName.split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      return `${words[0].charAt(0).toUpperCase()}${words[1]
        .charAt(0)
        .toUpperCase()}`;
    }
  };

  useEffect(() => {
    // Fetch groups when the component mounts
    fetchGroups();
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div
          className={`drawer-content flex flex-col ${
            isNoteOpen ? "" : "justify-center"
          }  items-center  bg-accent`}
        >
          {isNoteOpen ? (
            <Notes groups={groups} groupId={group_Id} />
          ) : (
            <>
              <div>
                <img src={Image} alt="pocket notes" />
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-bold">Pocket Notes</h2>
                <p className="m-2 text-neutral">
                  Send and receive messages without keeping your phone online.{" "}
                  <br />
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
              </div>

              <div>
                <p className="mt-40 mb-3">
                  <MdEnhancedEncryption className="inline mr-2" />
                  end-to-end encrypted
                </p>
              </div>
            </>
          )}
        </div>
        <div className="drawer-side bg-primary">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <h3 className="text-3xl p-6 text-center text-slate-900">
            Pocket Notes
          </h3>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* list of groups*/}
            {groups.map((group) => (
  <li key={group._id}>
    <button
      className="hover:bg-accent my-2"
      onClick={() => openNotes(group._id)}
    >
      <div
        className={`bg-${group.color} rounded-full h-12 w-12 flex items-center justify-center text-center text-xl text-slate-800`}
      >
        {generateInitials(group.name)}
      </div>
      <p className="font-bold text-lg ml-2">{group.name}</p>
    </button>
  </li>
))}
          </ul>
        </div>
      </div>
      <button
        className="flex justify-center items-center text-primary text-6xl absolute bottom-8 left-52"
        onClick={openModal}
      >
        <MdAddCircle fill="#16008B" size={72} />
      </button>
      {/* Modal */}
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
}

export default App;
