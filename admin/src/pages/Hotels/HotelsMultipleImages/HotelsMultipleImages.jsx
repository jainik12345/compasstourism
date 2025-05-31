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
import Add from "../../../components/Buttons/Add";
import Trace from "../../../components/Buttons/Trace";
import DeleteData from "../../../components/Popup/DeleteData";

const HotelsMultipleImages = () => {
  const [hotelList, setHotelList] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      const res = await axios.get(`${BE_URL}/hotelName`);
      setHotelList(res.data.data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };
  const fetchImages = async (hotelId) => {
    try {
      const res = await axios.get(`${BE_URL}/hotelMultipleImages/${hotelId}`);
      const formatted = res.data.data.map((item) => ({
        ...item,
        images: item.images.map(
          (filename) =>
            `${BE_URL}/Images/HotelImages/HotelMultipleImages/${filename}`
        ),
      }));
      setData(formatted);
    } catch (err) {
      console.error("Error fetching images:", err);
      setData([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BE_URL}/hotelMultipleImages/${id}`);
      setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
        fetchImages(selectedHotelId);
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
    fetchHotels();
  }, []);

  useEffect(() => {
    if (selectedHotelId) fetchImages(selectedHotelId);
  }, [selectedHotelId]);

  return (
    <div className="p-4 rounded-xl bg-white">
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}

      {/* Top Bar */}
      <div className="flex justify-between mb-4">
        <Trace onClick={() => navigate("/hotels-multiple-images/trace")} />
        <Add
          text="Add Hotel Images"
          width="w-[200px]"
          onClick={() => navigate("/hotels-multiple-images/insert")}
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
                        alt={`Hotel Image ${idx}`}
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
                        navigate("/hotels-multiple-images/update", {
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

export default HotelsMultipleImages;
