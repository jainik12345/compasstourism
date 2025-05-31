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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Trace from "../../../components/Buttons/Trace";
import Add from "../../../components/Buttons/Add";
import DeleteData from "../../../components/Popup/DeleteData";

const HotelsAbout = () => {
  const [hotelList, setHotelList] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (selectedHotelId) {
      fetchAboutData(selectedHotelId);
    }
  }, [selectedHotelId]);

  const fetchHotels = async () => {
    try {
      const res = await axios.get(`${BE_URL}/hotelName`);
      setHotelList(res.data.data);
    } catch (err) {
      console.error("Error fetching hotels", err);
    }
  };

  const fetchAboutData = async (hotelId) => {
    try {
      const res = await axios.get(`${BE_URL}/hotelAbout/${hotelId}`);
      setData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching hotel about data", err);
      setData([]); 
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BE_URL}/hotelAbout/${id}`);
      setShowDeletePopup(true); // ✅ show popup
      fetchAboutData(selectedHotelId); // ✅ refresh data
    } catch (err) {
      console.error("Error deleting data", err);
    }
  };

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white">
      {/* Top Controls */}
      <div className="flex justify-between mb-4">
        <Trace onClick={() => navigate("/hotels-about/trace")} />
        <Add
          text="Add Hotel About"
          width="w-[200px]"
          onClick={() => navigate("/hotels-about/insert")}
        />
      </div>

      {/* Hotel Selector */}
      <FormControl fullWidth className="mb-6">
        <InputLabel>Select Hotel</InputLabel>
        <Select
          value={selectedHotelId}
          label="Select Hotel"
          onChange={(e) => setSelectedHotelId(e.target.value)}
        >
          {hotelList.map((hotel) => (
            <MenuItem key={hotel.id} value={hotel.id}>
              {hotel.hotel_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <hr className="border-gray-300 mb-6" />

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="!font-bold">ID</TableCell>
              <TableCell className="!font-bold">About Description</TableCell>
              <TableCell className="!font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>{row.about}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() =>
                        navigate("/hotels-about/update", {
                          state: { rowData: row },
                        })
                      }
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(row.id)}
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
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>

      {/* Delete Popup */}
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}
    </div>
  );
};

export default HotelsAbout;
