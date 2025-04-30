import React from "react";

const Loading = () => {
  return (
    <div className=" w-full h-screen flex justify-center items-center bg-[#ffff]">
      <div className="w-10 h-10 bg-gradient-to-r from-[#FF8904] to-[#FF5700] rounded-full animate-ping"></div>
    </div>
  );
};

export default Loading;
