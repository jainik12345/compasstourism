import React from "react";

const Submit = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-5 py-2.5 text-[18px] cursor-pointer 
      hover:bg-blue-600 w-[120px] text-center rounded-[8px]
      transition-all duration-500 ease-in-out"
    >
      Submit
    </button>
  );
};

export default Submit;
