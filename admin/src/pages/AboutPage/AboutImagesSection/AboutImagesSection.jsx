/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import Trace from "../../../components/Buttons/Trace";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";

const AboutImagesSection = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BE_URL}/aboutImageSection`);
      const formatted = res.data.data.map((item) => ({
        ...item,
        images: item.about_images.map(
          (filename) =>
            `${BE_URL}/Images/AboutImages/AboutImageSection/${filename}`
        ),
      }));
      setData(formatted);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const handleAddClick = () => {
    navigate("/about-images-section/insert");
  };

  const handleTraceClick = () => {
    navigate("/about-images-section/trace");
  };

  const handleEditClick = (row) => {
    navigate("/about-images-section/update", { state: { rowData: row } });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${BE_URL}/aboutImageSection/${id}`);
      setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
        fetchData();
      }, 2500);
    } catch (err) {
      console.error("Soft delete failed:", err);
    }
  };

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white">
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}

      {/* Top Buttons */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add text="Add Image" width="w-[200px]" onClick={handleAddClick} />
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
                <TableCell className="border-r text-left">
                  <div className="flex flex-wrap gap-2">
                    {row.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Image ${i}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
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
                      onClick={() => handleDeleteClick(row.id)}
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
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default AboutImagesSection;
