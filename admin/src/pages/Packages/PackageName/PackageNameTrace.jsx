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

const PackageNameTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [trashedPackages, setTrashedPackages] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch countries
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageCountry`)
      .then((res) => setCountryOptions(res.data.data))
      .catch((err) => console.error("Country fetch failed:", err));
  }, []);

  // Fetch trashed packages by selected country
  useEffect(() => {
    if (selectedCountryId) {
      axios
        .get(`${BE_URL}/packageName/trashed/country/${selectedCountryId}`)
        .then((res) => setTrashedPackages(res.data.data))
        .catch((err) => console.error("Trash fetch failed:", err));
    } else {
      setTrashedPackages([]);
    }
  }, [selectedCountryId]);

  const handleCountryChange = (e) => {
    setSelectedCountryId(e.target.value);
    setPage(1);
  };

  const handleRestore = (id) => {
    axios
      .put(`${BE_URL}/packageName/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedPackages((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedPackages.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-6 rounded-xl bg-white relative shadow-lg ">
      {/* Restore success popup */}
      {restoreSuccess && <RestoreData />}

      {/* Header with title and back button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          Trashed Package Names
        </h2>
        <Back onClick={() => navigate("/package-name")} />
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
                Package Name
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
                <TableCell colSpan={3} align="center" className="py-6">
                  No trashed packages found.
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
                  <TableCell className="border-r">{row.package_name}</TableCell>
                  <TableCell className="border-r">
                    {row.image ? (
                      <img
                        src={`${BE_URL}/Images/PackageImages/PackageNameImages/${row.image}`}
                        alt={row.package_name}
                        style={{
                          width: "80px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <Tooltip title="Restore Package" arrow>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Package"
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
            count={Math.ceil(trashedPackages.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default PackageNameTrace;
