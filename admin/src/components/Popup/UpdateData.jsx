import React, { useEffect } from "react";

const UpdateData = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
      <p className="font-medium">Data Updated Successfully</p>
    </div>
  );
};

export default UpdateData;
