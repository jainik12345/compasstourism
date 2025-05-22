/* eslint-disable no-unused-vars */
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
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import Trace from "../../../components/Buttons/Trace";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";

const ContactSectionAddress = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const navigate = useNavigate();

  const data = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Office ${i + 1}`,
    address: `123 Example Street, City ${i + 1}, Country`,
  }));

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAddClick = () => {
    navigate("/contact-section-address/insert");
  };

  const handleTraceClick = () => {
    navigate("/contact-section-address/trace");
  };

  const handleEditClick = (row) => {
    navigate("/contact-section-address/update", { state: { rowData: row } });
  };

  const handleDelete = (id) => {
    setShowDeletePopup(true);
  };

  return (
    <div className="p-4 rounded-xl bg-white">
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}

      {/* Top Buttons */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add text="Add Address" width="w-[200px]" onClick={handleAddClick} />
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
                Title
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Address
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
                  {row.title}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.address}
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

export default ContactSectionAddress;
