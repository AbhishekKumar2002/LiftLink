import React from "react";
import Image from "next/image";

const MessageInput = () => {
  return (
    
    <div className="relative w-full" >
    <input
      placeholder="write your Message" className="text-black font-light py-2 px-4 rounded-full w-full bg-slate-400"
    />
   
    </div>

  );
};

export default MessageInput ;