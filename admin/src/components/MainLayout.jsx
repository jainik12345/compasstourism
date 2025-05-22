import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    navigate("/admin");
  };

  const getPageTitle = () => {
    const path = location.pathname.split("/").filter(Boolean);
    if (path.length === 0) return "Home";
    return path[path.length - 1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`transition-all duration-300 min-h-screen overflow-y-auto bg-gray-100 p-4 border-l border-gray-700 relative ${
          isOpen ? "ml-[250px]" : "ml-[80px]"
        } flex-1`}
      >
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 cursor-pointer  text-white px-4 py-2 rounded shadow-lg z-40"
        >
          Logout
        </button>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
            {/* <p className="text-sm text-gray-500">Home / {getPageTitle()}</p> */}
          </div>
          <hr className="border-gray-300" />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
