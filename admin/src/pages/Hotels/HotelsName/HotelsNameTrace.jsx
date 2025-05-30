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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import RestoreData from "../../../components/Popup/RestoreData";
import Back from "../../../components/Buttons/Back";
import { FaRecycle } from "react-icons/fa";

const HotelsNameTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [trashedHotels, setTrashedHotels] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch hotel cities
  useEffect(() => {
    axios
      .get(`${BE_URL}/hotelCityName`)
      .then((res) => setCityOptions(res.data.data))
      .catch((err) => console.error("City fetch failed:", err));
  }, []);

  // Fetch trashed hotels by selected city
  useEffect(() => {
    if (selectedCityId) {
      axios
        .get(`${BE_URL}/hotelName/trashed/city/${selectedCityId}`)
        .then((res) => setTrashedHotels(res.data.data))
        .catch((err) => console.error("Trash fetch failed:", err));
    } else {
      setTrashedHotels([]);
    }
  }, [selectedCityId]);

  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
    setPage(1);
  };

  const handleRestore = (id) => {
    axios
      .patch(`${BE_URL}/hotelName/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedHotels((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedHotels.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-6 rounded-xl bg-white relative shadow-lg">
      {/* Restore success popup */}
      {restoreSuccess && <RestoreData />}

      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          Trashed Hotel Names
        </h2>
        <Back onClick={() => navigate("/hotels-name")} />
      </Box>

      {/* City Selector */}
      <Box mb={4}>
        <FormControl fullWidth>
          <InputLabel id="select-city-label">Select City</InputLabel>
          <Select
            labelId="select-city-label"
            value={selectedCityId}
            onChange={handleCityChange}
            label="Select City"
            displayEmpty
          >
            {cityOptions.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.city_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <hr className="border-gray-300 mb-6" />

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r font-bold text-base">#</TableCell>
              <TableCell className="border-r font-bold text-base">
                Hotel Name
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Description
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Price
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Image
              </TableCell>
              <TableCell className="font-bold text-base text-center">
                Restore
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" className="py-6">
                  First select a city name, then hotel names will appear here.
                </TableCell>
              </TableRow>
            ) : (
              displayedRows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-100 transition-all"
                >
                  <TableCell className="border-r">
                    {(page - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="border-r">{row.hotel_name}</TableCell>
                  <TableCell className="border-r">
                    {row.hotel_description || "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    ₹{row.hotel_price || "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.hotel_image ? (
                      <img
                        src={`${BE_URL}/Images/HotelImages/HotelsNameImage/${row.hotel_image}`}
                        alt="hotel"
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip title="Restore Hotel" arrow>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Hotel"
                      >
                        <FaRecycle size={22} />
                      </button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(trashedHotels.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default HotelsNameTrace;
