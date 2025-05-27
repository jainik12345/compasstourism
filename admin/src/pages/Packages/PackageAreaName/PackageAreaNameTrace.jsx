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

const PackageAreaNameTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState("");
  const [trashedAreas, setTrashedAreas] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch all states
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageStateName`)
      .then((res) => setStateOptions(res.data.data))
      .catch((err) => console.error("State fetch failed:", err));
  }, []);

  // Fetch trashed area names for selected state
  useEffect(() => {
    if (selectedStateId) {
      axios
        .get(`${BE_URL}/packageAreaName/trashed/${selectedStateId}`)
        .then((res) => setTrashedAreas(res.data.data))
        .catch((err) => console.error("Trashed area fetch failed:", err));
    } else {
      setTrashedAreas([]);
    }
  }, [selectedStateId]);

  const handleStateChange = (e) => {
    setSelectedStateId(e.target.value);
    setPage(1);
  };

  const handleRestore = (id) => {
    axios
      .put(`${BE_URL}/packageAreaName/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedAreas((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedAreas.slice(
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
          Trashed Area Names
        </h2>
        <Back onClick={() => navigate("/package-area-name")} />
      </Box>

      {/* State Selector */}
      <Box mb={4}>
        <FormControl fullWidth>
          <InputLabel id="select-state-label">Select State</InputLabel>
          <Select
            labelId="select-state-label"
            value={selectedStateId}
            onChange={handleStateChange}
            label="Select State"
            displayEmpty
          >
            {stateOptions.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.package_state_name}
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
                  First select state name, then area name will appear here.
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
                    {row.package_area_name}
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip title="Restore Area" arrow>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Area"
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
            count={Math.ceil(trashedAreas.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default PackageAreaNameTrace;
