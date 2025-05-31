import React, { useEffect, useState } from "react";
import axios from "axios";
import BE_URL from "../../../config";
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
import { useNavigate } from "react-router-dom";
import Add from "../../../components/Buttons/Add";
import Trace from "../../../components/Buttons/Trace";
import DeleteData from "../../../components/Popup/DeleteData";

const HomeImageSlider = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BE_URL}/homeImageSlider`);
      const formatted = res.data.data.map((item) => ({
        ...item,
        images: item.home_slider_images.map(
          (filename) =>
            `${BE_URL}/Images/HomeImages/HomeImageSlider/${filename}`
        ),
      }));
      setData(formatted);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BE_URL}/HomeImageSlider/${id}`);
      setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
        fetchData();
      }, 2500);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 rounded-xl bg-white">
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}

      {/* Top Buttons */}
      <div className="flex justify-between mb-4">
        <Trace onClick={() => navigate("/home-image-slider/trace")} />
        <Add
          text="Add Slider Image"
          width="w-[200px]"
          onClick={() => navigate("/home-image-slider/insert")}
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
                Multiple Images
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
                  <div className="flex space-x-2 overflow-x-auto max-w-[95%]">
                    {row.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Slider ${idx}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex space-x-4">
                    <button
                      className="text-green-600 cursor-pointer hover:text-green-800"
                      onClick={() =>
                        navigate("/home-image-slider/update", {
                          state: { rowData: row },
                        })
                      }
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
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default HomeImageSlider;