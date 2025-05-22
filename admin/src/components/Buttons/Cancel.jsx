import React from "react";

const Cancel = ({ onClick }) => {
  return (
    <>
      <button
        type="button" 
        onClick={onClick}
        className="bg-[#ffc107] text-[#1f2d3d] px-5 py-2.5 text-[18px] cursor-pointer 
      hover:bg-[#ffb907] w-[120px] text-center rounded-[8px]
      transition-all duration-500 ease-in-out"
      >
        Cancel
      </button>
    </>
  );
};

export default Cancel;
