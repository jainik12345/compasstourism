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
import axios from "axios";
import BE_URL from "../../config";
import { useNavigate } from "react-router-dom";
import Back from "../../components/Buttons/Back";
import RestoreData from "../../components/Popup/RestoreData";

const TermsConditionsTrace = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchTraceData();
  }, []);

  const fetchTraceData = async () => {
    try {
      const res = await axios.get(`${BE_URL}/termsConditions/trashed`);
      if (res.data?.status === "success") {
        setRows(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch trace data:", err);
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await axios.patch(`${BE_URL}/termsConditions/restore/${id}`);
      if (res.data?.status === "success") {
        fetchTraceData();
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Restore failed:", err);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleBackClick = () => {
    navigate("/terms-conditions");
  };

  const displayedRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white">
      {showPopup && <RestoreData onClose={() => setShowPopup(false)} />}
      <h2 className="text-xl font-semibold text-center mb-4">
        Trashed Terms & Conditions
      </h2>
      <hr className="border-gray-300 mb-6" />

      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r font-bold">ID</TableCell>
              <TableCell className="border-r font-bold">Title</TableCell>
              <TableCell className="border-r font-bold">Rules</TableCell>
              <TableCell className="font-bold">Restore</TableCell>
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
                  <button
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => handleRestore(row.id)}
                  >
                    <FaRecycle size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-between p-4">
          <Back onClick={handleBackClick} />
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

export default TermsConditionsTrace;
