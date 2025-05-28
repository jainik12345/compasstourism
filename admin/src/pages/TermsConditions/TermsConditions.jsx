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
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../components/Buttons/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../config";
import DeleteData from "../../components/Popup/DeleteData";
import Trace from "../../components/Buttons/Trace";

const TermsConditions = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await axios.get(`${BE_URL}/termsConditions`);
        if (res.data?.status === "success") {
          setRows(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch terms:", err);
      }
    };

    fetchTerms();
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const displayedRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEditClick = (rowData) => {
    navigate("/terms-conditions/update", {
      state: { rowData },
    });
  };

  const handletraceClick = () => {
    navigate("/terms-conditions/trace");
  };

  const handleAddClick = () => {
    navigate("/terms-conditions/insert");
  };
  const handleDeleteClick = async (id) => {
    try {
      const res = await axios.delete(`${BE_URL}/termsConditions/delete/${id}`);
      if (res.data?.status === "success") {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        setShowDeletePopup(true);
      }
    } catch (err) {
      console.error("Failed to delete term:", err);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white">
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}

      {/* Top Button */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handletraceClick} />
        <Add text="Add Terms" width="w-[130px]" onClick={handleAddClick} />
      </div>

      <hr className="border-gray-300 mb-6" />

      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r font-bold">ID</TableCell>
              <TableCell className="border-r font-bold">Title</TableCell>
              <TableCell className="border-r font-bold">Rules</TableCell>
              <TableCell className="font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow key={row.id} className="hover:bg-gray-100">
                <TableCell className="border-r">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border-r">
                  {row.terms_conditions_title}
                </TableCell>
                <TableCell className="border-r text-sm">
                  <div className="space-y-1 overflow-y-auto max-h-20">
                    {row.terms_conditions_rules.map((rule, i) => (
                      <div key={i}>• {rule}</div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-4">
                    <button
                      className="text-green-600 cursor-pointer hover:text-green-800"
                      onClick={() => handleEditClick(row)}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 cursor-pointer hover:text-red-800"
                      onClick={() => handleDeleteClick(row.id)}
                    >
                      <FaTrash size={20} />
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
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default TermsConditions;
