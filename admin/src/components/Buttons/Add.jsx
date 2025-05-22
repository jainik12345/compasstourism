import React from "react";

const Add = ({
  text = "Add",
  bgColor = "bg-green-700",
  hoverColor = "hover:bg-green-800",
  width = "w-[120px]",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} text-white px-5 py-3 text-[18px] cursor-pointer 
      ${hoverColor} ${width} text-center rounded-[8px]
      transition-all duration-500 ease-in-out`}
    >
      {text}
    </button>
  );
};

export default Add;
