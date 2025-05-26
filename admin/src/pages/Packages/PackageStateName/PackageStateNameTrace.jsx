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

const PackageStateNameTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [trashedStates, setTrashedStates] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch countries
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageCountry`)
      .then((res) => setCountryOptions(res.data.data))
      .catch((err) => console.error("Country fetch failed:", err));
  }, []);

  // Fetch trashed state names by selected country
  useEffect(() => {
    if (selectedCountryId) {
      axios
        .get(`${BE_URL}/packageStateName/trashed/${selectedCountryId}`)
        .then((res) => setTrashedStates(res.data.data))
        .catch((err) => console.error("Trash fetch failed:", err));
    } else {
      setTrashedStates([]);
    }
  }, [selectedCountryId]);

  const handleCountryChange = (e) => {
    setSelectedCountryId(e.target.value);
    setPage(1);
  };

  const handleRestore = (id) => {
    axios
      .put(`${BE_URL}/packageStateName/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedStates((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedStates.slice(
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
          Trashed State Names
        </h2>
        <Back onClick={() => navigate("/package-state-name")} />
      </Box>

      {/* Country Selector */}
      <Box mb={4}>
        <FormControl fullWidth>
          <InputLabel id="select-country-label">Select Country</InputLabel>
          <Select
            labelId="select-country-label"
            value={selectedCountryId}
            onChange={handleCountryChange}
            label="Select Country"
            displayEmpty
          >
            {countryOptions.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.package_country_name}
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
                State Name
              </TableCell>
              <TableCell className="font-bold text-base text-center">
                Restore
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" className="py-6">
                  First select country name, then state name will appear here.
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
                  <TableCell className="border-r">
                    {row.package_state_name}
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip title="Restore State" arrow>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore State"
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
            count={Math.ceil(trashedStates.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default PackageStateNameTrace;
