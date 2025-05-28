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
import Back from "../../components/Buttons/Back";
import RestoreData from "../../components/Popup/RestoreData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../config";

const InquireTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [data, setData] = useState([]);
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrashedData = async () => {
      try {
        const response = await axios.get(`${BE_URL}/inquire/trashed`);
        if (response.data.status === "success") {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch trashed data:", error);
      }
    };
    fetchTrashedData();
  }, []);

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleRestoreClick = async (id) => {
    try {
      const response = await axios.patch(
        `${BE_URL}/inquire/restore/${id}`
      );
      if (response.data.status === "success") {
        setData((prev) => prev.filter((row) => row.id !== id));
        setSelectedId(id);
        setShowRestorePopup(true);
      } else {
        console.error("Failed to restore the record");
      }
    } catch (error) {
      console.error("Error restoring record:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/inquire");
  };

  return (
    <div className="p-4 rounded-xl bg-white">
      {/* Restore Popup */}
      {showRestorePopup && (
        <RestoreData
          id={selectedId}
          onClose={() => {
            setShowRestorePopup(false);
            setSelectedId(null);
          }}
        />
      )}

      {/* Header and Back */}
      <div className="flex justify-between mb-4">
        <h2 className="text-left font-semibold text-xl">
          Contact Form Details Trace
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
                First Name
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Last Name
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Email Address
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Mobile Number
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Message
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
                <TableCell className="border-r text-left">
                  {row.firstname}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.lastname}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.email_id}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.mobile_number}
                </TableCell>
                <TableCell
                  className="border-r text-left"
                  style={{ maxWidth: 200, whiteSpace: "pre-wrap" }}
                >
                  {row.message}
                </TableCell>
                <TableCell className="text-left">
                  <button
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => handleRestoreClick(row.id)}
                    title="Restore"
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

export default InquireTrace;
