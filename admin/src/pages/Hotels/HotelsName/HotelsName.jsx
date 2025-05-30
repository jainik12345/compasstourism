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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import Trace from "../../../components/Buttons/Trace";

const HotelsName = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [hotels, setHotels] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch hotel cities
  useEffect(() => {
    axios
      .get(`${BE_URL}/hotelCityName`)
      .then((res) => setCityOptions(res.data.data))
      .catch((err) => console.error("Hotel city fetch failed:", err));
  }, []);

  // Fetch hotels by city
  useEffect(() => {
    if (selectedCityId) {
      axios
        .get(`${BE_URL}/hotelName/city/${selectedCityId}`)
        .then((res) => setHotels(res.data.data))
        .catch((err) => console.error("Hotel fetch failed:", err));
    } else {
      setHotels([]);
    }
  }, [selectedCityId]);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/hotelName/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setHotels((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Delete failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleAdd = () => navigate("/hotels-name/insert");

  const handleUpdate = (item) => {
    navigate("/hotels-name/update", {
      state: { hotelData: item },
    });
  };

  const handleTraceClick = () => navigate("/hotels-name/trace");

  const handleCityChange = (event) => {
    setSelectedCityId(event.target.value);
    setPage(1);
  };

  const displayedRows = hotels.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      {/* Add Button */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add text="Add Hotel" width="w-[200px]" onClick={handleAdd} />
      </div>

      {/* City Selector */}
      <div className="mb-4">
        <FormControl fullWidth>
          <InputLabel>Select Hotel City</InputLabel>
          <Select
            value={selectedCityId}
            onChange={handleCityChange}
            label="Select Hotel City"
          >
            {cityOptions.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.city_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Hotel Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r font-bold">ID</TableCell>
              <TableCell className="border-r font-bold">Hotel Name</TableCell>
              <TableCell className="border-r font-bold">Description</TableCell>
              <TableCell className="border-r font-bold">Price</TableCell>
              <TableCell className="border-r font-bold">Image</TableCell>
              <TableCell className="font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow key={row.id} className="hover:bg-gray-100">
                <TableCell className="border-r">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border-r">{row.hotel_name}</TableCell>
                <TableCell className="border-r">
                  {row.hotel_description}
                </TableCell>
                <TableCell className="border-r">{row.hotel_price}</TableCell>
                <TableCell className="border-r">
                  {row.hotel_image ? (
                    <img
                      src={`${BE_URL}/Images/HotelImages/HotelsNameImage/${row.hotel_image}`}
                      alt="Hotel"
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-4">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleUpdate(row)}
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
            count={Math.ceil(hotels.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default HotelsName;
