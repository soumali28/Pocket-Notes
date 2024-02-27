import React from "react";
import { IoMdSend } from "react-icons/io";

const Notes = () => {
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
        <div className="bg-primary p-8">
          <p>
            Another productive way to use this tool to begin a daily writing
            routine. One way is to generate a random paragraph with the
            intention to try to rewrite it while still keeping the original
            meaning. The purpose here is to just get the writing started so that
            when the writer goes onto their day's writing projects, words are
            already flowing from their fingers.
          </p>
          <p className="text-neutral text-right font-medium">
            9 Mar 2023 &#x2022; 10:10 AM
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 w-9/12">
        <div className="bg-info py-3 px-6 relative">
          <input
            type="text"
            placeholder="Enter the text here...."
            className="p-4 h-24 w-full rounded-md"
          />
          <button className="absolute bottom-4 right-8">
            <IoMdSend fill="#ABABAB" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
