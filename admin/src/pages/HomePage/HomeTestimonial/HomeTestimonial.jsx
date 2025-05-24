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

const HomeTestimonial = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BE_URL}/homeTestimonial`);
      setData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAddClick = () => {
    navigate("/home-testimonial/insert");
  };

  const handleTraceClick = () => {
    navigate("/home-testimonial/trace");
  };

  const handleEditClick = (row) => {
    navigate("/home-testimonial/update", { state: { rowData: row } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BE_URL}/homeTestimonial/delete/${id}`);
      setDeleteId(id);
      setShowDeletePopup(true);
      setTimeout(() => setShowDeletePopup(false), 2500);
      fetchData(); // Refresh table
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white">
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}

      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add Testimonial"
          width="w-[200px]"
          onClick={handleAddClick}
        />
      </div>

      <hr className="border-gray-300 mb-6" />

      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="!font-bold">ID</TableCell>
              <TableCell className="!font-bold">Description</TableCell>
              <TableCell className="!font-bold">Name</TableCell>
              <TableCell className="!font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow key={row.id} className="hover:bg-gray-100">
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEditClick(row)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaEdit size={22} />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={22} />
                    </button>
                  </div>
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

export default HomeTestimonial;
