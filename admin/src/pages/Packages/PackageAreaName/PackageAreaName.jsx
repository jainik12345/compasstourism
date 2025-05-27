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
import Trace from "../../../components/Buttons/Trace";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";

const PackageAreaName = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [states, setStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState("");
  const [areaNames, setAreaNames] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch all state names
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageStateName`)
      .then((res) => setStates(res.data.data))
      .catch((err) => console.error("Failed to fetch states:", err));
  }, []);

  // Fetch area names by selected state ID
  useEffect(() => {
    if (selectedStateId) {
      axios
        .get(`${BE_URL}/packageAreaName/data/${selectedStateId}`)
        .then((res) => setAreaNames(res.data.data))
        .catch((err) => console.error("Failed to fetch area names:", err));
    } else {
      setAreaNames([]);
    }
  }, [selectedStateId]);

  // Delete area name
  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/packageAreaName/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setAreaNames((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        }
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleAdd = () => {
    navigate("/package-area-name/insert");
  };

  const handleUpdate = (item) => {
    navigate("/package-area-name/update", {
      state: { packageAreaData: item },
    });
  };

  const handleTraceClick = () => {
    navigate("/package-area-name/trace");
  };

  const handleStateChange = (event) => {
    setSelectedStateId(event.target.value);
    setPage(1);
  };

  const displayedRows = areaNames.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      {/* Top Buttons */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add Package Area Name"
          width="w-[250px]"
          onClick={handleAdd}
        />
      </div>

      {/* State Selector */}
      <div className="mb-4">
        <FormControl fullWidth>
          <InputLabel>Select State</InputLabel>
          <Select
            value={selectedStateId}
            onChange={handleStateChange}
            label="Select State"
          >
            {states.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.package_state_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Area Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r font-bold text-base">ID</TableCell>
              <TableCell className="border-r font-bold text-base">
                Area Name
              </TableCell>
              <TableCell className="font-bold text-base">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition-all duration-300"
              >
                <TableCell className="border-r">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border-r">
                  {row.package_area_name}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-4">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleUpdate(row)}
                    >
                      <FaEdit size={22} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
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
            count={Math.ceil(areaNames.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default PackageAreaName;
