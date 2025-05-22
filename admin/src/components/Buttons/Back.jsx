import React from "react";

const Back = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-[#ffc107] text-[#1f2d3d] px-5 py-1.5 text-[18px]  cursor-pointer 
      hover:bg-[#ffb907] w-[100px] text-center rounded-[8px]
      transition-all duration-500 ease-in-out"
    >
      Back
    </button>
  );
};

export default Back;
