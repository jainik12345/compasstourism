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

const HotelsRulesTrace = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [data, setData] = useState([]);
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [loadingRules, setLoadingRules] = useState(false);

  const navigate = useNavigate();

  // Fetch all hotels for selector dropdown
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

  // Fetch trashed rules, then filter by hotelId on frontend
  const fetchTrashedRulesByHotel = async (hotelId) => {
    if (!hotelId) {
      setData([]);
      return;
    }
    setLoadingRules(true);
    try {
      const res = await axios.get(`${BE_URL}/hotelRules/trashed`);
      // Filter trashed rules by hotel_id (assumes each item has hotel_id)
      const filtered = (res.data.data || []).filter(
        (item) => item.hotel_id === hotelId || item.hotel_id == hotelId
      );
      const formatted = filtered.map((item) => ({
        ...item,
        rules: Array.isArray(item.rules)
          ? item.rules
          : (() => {
              try {
                return JSON.parse(item.rules);
              } catch {
                return [];
              }
            })(),
      }));
      setData(formatted);
    } catch (err) {
      console.error("Error fetching trashed rules:", err);
      setData([]);
    } finally {
      setLoadingRules(false);
    }
  };

  // Handle hotel selector change
  const handleHotelChange = (e) => {
    setSelectedHotel(e.target.value);
    setPage(1);
    fetchTrashedRulesByHotel(e.target.value);
  };

  // Restore rules data by id
  const handleRestore = async (id) => {
    try {
      await axios.patch(`${BE_URL}/hotelRules/restore/${id}`);
      setShowRestorePopup(true);
      setTimeout(() => {
        setShowRestorePopup(false);
        fetchTrashedRulesByHotel(selectedHotel);
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
    navigate("/hotels-rules");
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
        <h2 className="text-left font-semibold text-xl">Hotels Rules Trace</h2>
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

      {loadingRules ? (
        <div className="flex justify-center py-20">
          <CircularProgress />
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">
          No trashed rules found for selected hotel.
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
                  Check In
                </TableCell>
                <TableCell className="border-r !font-extrabold text-base text-left">
                  Check Out
                </TableCell>
                <TableCell className="border-r !font-extrabold text-base text-left">
                  Rooms
                </TableCell>
                <TableCell className="border-r !font-extrabold text-base text-left">
                  Floors
                </TableCell>
                <TableCell className="border-r !font-extrabold text-base text-left">
                  Rules
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
                    {row.check_in}
                  </TableCell>
                  <TableCell className="border-r text-left">
                    {row.check_out}
                  </TableCell>
                  <TableCell className="border-r text-left">
                    {row.rooms}
                  </TableCell>
                  <TableCell className="border-r text-left">
                    {row.floors}
                  </TableCell>
                  <TableCell className="border-r text-left">
                    <ol className="list-decimal ml-5">
                      {Array.isArray(row.rules) &&
                        row.rules.map((rule, rIdx) => (
                          <li key={rIdx}>
                            <span className="font-semibold">
                              {rule.heading}
                            </span>
                            {Array.isArray(rule.titles) &&
                              rule.titles.length > 0 && (
                                <ul className="list-disc ml-5">
                                  {rule.titles.map((title, tIdx) =>
                                    typeof title === "string" ? (
                                      <li key={tIdx}>{title}</li>
                                    ) : (
                                      <li key={tIdx}>{title.value}</li>
                                    )
                                  )}
                                </ul>
                              )}
                          </li>
                        ))}
                    </ol>
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

export default HotelsRulesTrace;
