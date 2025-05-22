import React from "react";

const Trace = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 cursor-pointer  hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
    >
      Trace (Soft Delete)
    </button>
  );
};

export default Trace;
