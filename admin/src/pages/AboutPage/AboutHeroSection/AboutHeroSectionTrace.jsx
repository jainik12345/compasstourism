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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import RestoreData from './../../../components/Popup/RestoreData';

const AboutHeroSectionTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [trashedData, setTrashedData] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [restoringId, setRestoringId] = useState(null); // to disable button while restoring
  const navigate = useNavigate();

  const fetchTrashedData = async () => {
    try {
      const res = await axios.get(`${BE_URL}/aboutHeroSection/trashed`);
      if (res.data.status === "success") {
        setTrashedData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch trashed data", error);
    }
  };

  useEffect(() => {
    fetchTrashedData();
  }, []);

  const handleRestoreClick = async (id) => {
    try {
      setRestoringId(id); // disable the clicked button during restore
      await axios.patch(`${BE_URL}/aboutHeroSection/restore/${id}`);
      setRestoringId(null);
      setShowSuccessPopup(true);
      fetchTrashedData();

      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2500);
    } catch (error) {
      setRestoringId(null);
      console.error("Restore failed", error);
    }
  };

  const displayedRows = trashedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleBackClick = () => {
    navigate("/about-hero-section");
  };

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {/* Success Popup */}
      {showSuccessPopup && (
        <RestoreData/>
      )}

      {/* Top Buttons */}
      <div className="flex justify-between mb-4">
        <h2 className="text-left font-semibold text-xl">
          About Hero Section Trace
        </h2>
        <Back onClick={handleBackClick} />
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
                Restore
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
                    src={`${BE_URL}/Images/AboutImages/AboutHeroSection/${row.image}`}
                    alt="Hero Section"
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-left">
                  <button
                    className="text-blue-600 cursor-pointer hover:text-blue-800 disabled:text-gray-400"
                    onClick={() => handleRestoreClick(row.id)}
                    disabled={restoringId === row.id}
                    title={restoringId === row.id ? "Restoring..." : "Restore"}
                  >
                    <FaRecycle size={22} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(trashedData.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default AboutHeroSectionTrace;
