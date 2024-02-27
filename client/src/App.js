import Image from "./images/image-removebg-preview 1.png";
import { MdEnhancedEncryption, MdAddCircle } from "react-icons/md";
import CustomModal from "./Modal";
import { useState } from "react";
import Notes from "./Notes";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNoteOpen, setNoteOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openNotes = () => {
    setNoteOpen(!isNoteOpen);
  };

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
            <Notes />
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
            {/* list of notes*/}
            <li>
              <button className="hover:bg-accent my-2" onClick={openNotes}>
                <div className="bg-red-200 rounded-full h-12 w-12 flex items-center justify-center text-center text-xl text-slate-800">
                  M.N
                </div>
                <p className="font-bold text-lg ml-2">My notes</p>
              </button>
            </li>
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
