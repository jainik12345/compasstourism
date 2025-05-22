import React from "react";

const Update = ({ onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-blue-500 text-white px-5 py-2.5 text-[18px] cursor-pointer 
      hover:bg-blue-600 w-[120px] text-center rounded-[8px]
      transition-all duration-500 ease-in-out"
    >
      Update
    </button>
  );
};

export default Update;
