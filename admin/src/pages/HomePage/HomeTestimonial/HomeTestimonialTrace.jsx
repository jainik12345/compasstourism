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
} from "@mui/material";
import { FaRecycle } from "react-icons/fa";
import Back from "../../../components/Buttons/Back";
import RestoreData from "../../../components/Popup/RestoreData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";

const HomeTestimonialTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchTrashedData = async () => {
    try {
      const response = await axios.get(`${BE_URL}/homeTestimonial/trashed`);
      setData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching trashed testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTrashedData();
  }, []);
  const handleRestoreClick = async (id) => {
    try {
      await axios.patch(`${BE_URL}/homeTestimonial/restore/${id}`);
      setSelectedId(id);
      setShowRestorePopup(true);

      fetchTrashedData();

      setTimeout(() => {
        setShowRestorePopup(false);
        setSelectedId(null);
      }, 2500);
    } catch (error) {
      console.error("Restore failed:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/home-testimonial");
  };

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white">
      {showRestorePopup && <RestoreData />}

      <div className="flex justify-between mb-4">
        <h2 className="text-left font-semibold text-xl">
          Home Testimonial Trace
        </h2>
        <Back onClick={handleBackClick} />
      </div>

      <hr className="border-gray-300 mb-6" />

      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="!font-extrabold text-base">ID</TableCell>
              <TableCell className="!font-extrabold text-base">
                Description
              </TableCell>
              <TableCell className="!font-extrabold text-base">Name</TableCell>
              <TableCell className="!font-extrabold text-base">
                Restore
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition-all duration-300"
              >
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleRestoreClick(row.id)}
                  >
                    <FaRecycle size={22} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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

export default HomeTestimonialTrace;
