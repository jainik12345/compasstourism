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

const HotelsFacilitiesDetails = () => {
  const [hotelList, setHotelList] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  // Fetch hotel list
  const fetchHotels = async () => {
    try {
      const res = await axios.get(`${BE_URL}/hotelName`);
      setHotelList(res.data.data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  // Fetch facilities details for selected hotel
  const fetchFacilitiesDetails = async (hotelId) => {
    try {
      const res = await axios.get(
        `${BE_URL}/hotelFacilitiesDetails/${hotelId}`
      );
      // API response assumed [{ id, heading, title (json/array) }]
      const formatted = res.data.data.map((item) => ({
        ...item,
        title: Array.isArray(item.title)
          ? item.title
          : (() => {
              try {
                return JSON.parse(item.title);
              } catch {
                return [];
              }
            })(),
      }));
      setData(formatted);
    } catch (err) {
      console.error("Error fetching facilities details:", err);
      setData([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BE_URL}/hotelFacilitiesDetails/${id}`);
      setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
        fetchFacilitiesDetails(selectedHotelId);
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
    if (selectedHotelId) fetchFacilitiesDetails(selectedHotelId);
  }, [selectedHotelId]);

  return (
    <div className="p-4 rounded-xl bg-white">
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}

      {/* Top Bar */}
      <div className="flex justify-between mb-4">
        <Trace onClick={() => navigate("/hotels-facilitie-details/trace")} />
        <Add
          text="Add Facilities Details"
          width="w-[220px]"
          onClick={() => navigate("/hotels-facilitie-details/insert")}
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
                Heading
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Titles
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
                  {row.heading}
                </TableCell>
                <TableCell className="border-r text-left">
                  <ul className="list-disc ml-5">
                    {Array.isArray(row.title) ? (
                      row.title.map((t, i) => <li key={i}>{t}</li>)
                    ) : (
                      <li>{row.title}</li>
                    )}
                  </ul>
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex space-x-4">
                    <button
                      className="text-green-600 cursor-pointer hover:text-green-800"
                      onClick={() =>
                        navigate("/hotels-facilitie-details/update", {
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

export default HotelsFacilitiesDetails;
