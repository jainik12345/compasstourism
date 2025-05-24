/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import Trace from "../../../components/Buttons/Trace";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";

const AboutHeroSection = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [data, setData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BE_URL}/aboutHeroSection`);
      const normalizedData = Array.isArray(response.data?.data)
        ? response.data.data.map((item) => ({
            ...item,
            image: `${BE_URL}/Images/AboutImages/AboutHeroSection/${item.image}`,
          }))
        : [];
      setData(normalizedData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const displayedRows = Array.isArray(data)
    ? data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    : [];

  const handleAddClick = () => {
    navigate("/about-hero-section/insert");
  };

  const handleTraceClick = () => {
    navigate("/about-hero-section/trace");
  };

  const handleEditClick = (row) => {
    navigate("/about-hero-section/update", { state: { rowData: row } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BE_URL}/aboutHeroSection/${id}`);
      setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
        fetchData();
      }, 2500);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white">
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}

      {/* Top Buttons */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add Hero Section"
          width="w-[200px]"
          onClick={handleAddClick}
        />
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r !font-extrabold text-base text-left">
                ID
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Description
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Image
              </TableCell>
              <TableCell className="!font-extrabold text-base text-left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition-all duration-300 border-t border-gray-300"
              >
                <TableCell className="border-r">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border-r text-left text-sm">
                  <div className="w-100 h-16 overflow-y-auto whitespace-normal">
                    {row.description}
                  </div>
                </TableCell>
                <TableCell className="border-r text-left">
                  <img
                    src={row.image}
                    alt="Hero Section"
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex space-x-4">
                    <button
                      className="text-green-600 cursor-pointer hover:text-green-800"
                      onClick={() => handleEditClick(row)}
                    >
                      <FaEdit size={22} />
                    </button>
                    <button
                      className="text-red-600 cursor-pointer hover:text-red-800"
                      onClick={() => handleDelete(row.id)}
                    >
                      <FaTrash size={22} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(
              (Array.isArray(data) ? data.length : 0) / rowsPerPage
            )}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default AboutHeroSection;
