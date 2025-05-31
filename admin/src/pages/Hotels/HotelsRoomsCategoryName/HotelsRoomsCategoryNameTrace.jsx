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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { FaRecycle } from "react-icons/fa";
import Back from "../../../components/Buttons/Back";
import RestoreData from "../../../components/Popup/RestoreData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";

const HotelsRoomsCategoryNameTrace = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [data, setData] = useState([]);
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [loadingRoomsCategory, setLoadingRoomsCategory] = useState(false);

  const navigate = useNavigate();

  const fetchHotels = async () => {
    setLoadingHotels(true);
    try {
      const res = await axios.get(`${BE_URL}/hotelName`);
      setHotels(res.data.data || []);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    } finally {
      setLoadingHotels(false);
    }
  };

  const fetchTrashedRoomCategoryByHotel = async (hotelId) => {
    if (!hotelId) {
      setData([]);
      return;
    }
    setLoadingRoomsCategory(true);
    try {
      const res = await axios.get(`${BE_URL}/hotelRoomCategoryName/trashed`);
      const filtered = res.data.data.filter((item) => item.hotel_id == hotelId);
      setData(filtered);
    } catch (err) {
      console.error("Error fetching trashed room category data:", err);
      setData([]);
    } finally {
      setLoadingRoomsCategory(false);
    }
  };

  const handleHotelChange = (e) => {
    setSelectedHotel(e.target.value);
    setPage(1);
    fetchTrashedRoomCategoryByHotel(e.target.value);
  };

  const handleRestore = async (id) => {
    try {
      await axios.patch(`${BE_URL}/hotelRoomCategoryName/restore/${id}`);
      setShowRestorePopup(true);
      setTimeout(() => {
        setShowRestorePopup(false);
        fetchTrashedRoomCategoryByHotel(selectedHotel);
      }, 2500);
    } catch (err) {
      console.error("Error restoring item:", err);
    }
  };

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleBackClick = () => {
    navigate("/hotels-rooms-category-name");
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="p-4 rounded-xl bg-white">
      {showRestorePopup && (
        <RestoreData onClose={() => setShowRestorePopup(false)} />
      )}

      <div className="flex justify-between mb-4">
        <h2 className="text-left font-semibold text-xl">
          Room Category Name Trace
        </h2>
        <Back onClick={handleBackClick} />
      </div>

      <hr className="border-gray-300 mb-6" />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="hotel-select-label">Select Hotel</InputLabel>
        <Select
          labelId="hotel-select-label"
          value={selectedHotel}
          label="Select Hotel"
          onChange={handleHotelChange}
          disabled={loadingHotels}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {hotels.map((hotel) => (
            <MenuItem key={hotel.id} value={hotel.id}>
              {hotel.hotel_name}
            </MenuItem>
          ))}
        </Select>
        {loadingHotels && <CircularProgress size={24} sx={{ mt: 1 }} />}
      </FormControl>

      {loadingRoomsCategory ? (
        <div className="flex justify-center py-20">
          <CircularProgress />
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">
          No trashed room category name found for selected hotel.
        </p>
      ) : (
        <TableContainer component={Paper} className="shadow-md">
          <Table className="border border-gray-300">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell className="border-r !font-extrabold text-base text-left">
                  ID
                </TableCell>
                <TableCell className="border-r !font-extrabold text-base text-left">
                  Room Category Name
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
                    {row.room_category_name}
                  </TableCell>
                  <TableCell className="text-left">
                    <button
                      className="text-blue-600 cursor-pointer hover:text-blue-800"
                      onClick={() => handleRestore(row.id)}
                    >
                      <FaRecycle size={22} />
                    </button>
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
      )}
    </div>
  );
};

export default HotelsRoomsCategoryNameTrace;
