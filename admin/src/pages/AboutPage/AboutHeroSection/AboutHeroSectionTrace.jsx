import React, { useState } from "react";
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
import Trace from "../../../components/Buttons/Trace";
import Back from "../../../components/Buttons/Back";
import RestoreData from "../../../components/Popup/RestoreData";
import sampleImage from "../../../assets/react.svg";
import { useNavigate } from "react-router-dom";

const AboutHeroSectionTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const data = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    description: `Archived description for Hero Section ${i + 1}`,
    image: sampleImage,
  }));

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleRestoreClick = (id) => {
    setSelectedId(id);
    setShowRestorePopup(true);
  };

  const handleBackClick = () => {
    navigate("/about-hero-section");
  };

  return (
    <div className="p-4 rounded-xl bg-white">
      {/* Restore Popup */}
      {showRestorePopup && (
        <RestoreData
          onClose={() => {
            setShowRestorePopup(false);
            setSelectedId(null);
          }}
          id={selectedId}
        />
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
                    src={row.image}
                    alt="Hero Section"
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-left">
                  <button
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => handleRestoreClick(row.id)}
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

export default AboutHeroSectionTrace;
