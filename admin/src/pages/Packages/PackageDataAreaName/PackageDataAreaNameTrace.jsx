// import React from 'react'

// const PackageDataAreaNameTrace = () => {
//   return (
//     <div>
//       PackageDataAreaName Trace
//     </div>
//   )
// }

// export default PackageDataAreaNameTrace

/** */

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

const PackageDataAreaNameTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [packageOptions, setPackageOptions] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [trashedMappings, setTrashedMappings] = useState([]);
  const [areaNames, setAreaNames] = useState({});
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch package titles
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageDataDetails`)
      .then((res) => setPackageOptions(res.data.data))
      .catch((err) => console.error("Failed to fetch packages:", err));
  }, []);

  // Fetch trashed area mappings for selected package
  useEffect(() => {
    if (selectedPackageId) {
      axios
        .get(`${BE_URL}/packageDataAreaName/trashed/${selectedPackageId}`)
        .then((res) => setTrashedMappings(res.data.data))
        .catch((err) => console.error("Failed to fetch trashed data:", err));
    } else {
      setTrashedMappings([]);
    }
  }, [selectedPackageId]);

  // Fetch all area names for ID->name mapping
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageAreaName`)
      .then((res) => {
        const mapping = {};
        res.data.data.forEach((area) => {
          mapping[area.id] = area.package_area_name;
        });
        setAreaNames(mapping);
      })
      .catch((err) => console.error("Failed to fetch area names:", err));
  }, []);

  const handleRestore = (id) => {
    axios
      .put(`${BE_URL}/packageDataAreaName/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedMappings((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const handlePackageChange = (e) => {
    setSelectedPackageId(e.target.value);
    setPage(1);
  };

  const displayedRows = trashedMappings.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-6 rounded-xl bg-white relative shadow-lg">
      {restoreSuccess && <RestoreData />}

      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          Trashed Area Name Mappings
        </h2>
        <Back onClick={() => navigate("/package-data-area-name")} />
      </Box>

      {/* Package Title Selector */}
      <Box mb={4}>
        <FormControl fullWidth>
          <InputLabel id="select-package-label">
            Select Package Title
          </InputLabel>
          <Select
            labelId="select-package-label"
            value={selectedPackageId}
            onChange={handlePackageChange}
            label="Select Package Title"
          >
            {packageOptions.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.data_title}
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
                Area Name
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
                  First select a package title, then trashed area names will
                  appear here.
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
                    {areaNames[row.area_id] || "Unknown"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip title="Restore Mapping" arrow>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Mapping"
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

        {/* Pagination */}
        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(trashedMappings.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default PackageDataAreaNameTrace;
