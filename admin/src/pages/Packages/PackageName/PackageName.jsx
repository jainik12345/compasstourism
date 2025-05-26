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
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import Trace from "../../../components/Buttons/Trace";

const PackageName = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [packages, setPackages] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch countries
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageCountry`)
      .then((res) => setCountryOptions(res.data.data))
      .catch((err) => console.error("Country fetch failed:", err));
  }, []);

  // Fetch packages by selected country
  useEffect(() => {
    if (selectedCountryId) {
      axios
        .get(`${BE_URL}/packageName/country/${selectedCountryId}`)
        .then((res) => setPackages(res.data.data))
        .catch((err) => console.error("Package fetch failed:", err));
    } else {
      setPackages([]);
    }
  }, [selectedCountryId]);

  // Delete handler
  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/packageName/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
      });
  };

  // Pagination logic
  const displayedRows = packages.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAdd = () => {
    navigate("/package-name/insert");
  };

  const handleUpdate = (pkg) => {
    navigate("/package-name/update", {
      state: { packageData: pkg },
    });
  };

  const handleTraceClick = () => {
    navigate("/package-name/trace");
  };

  const handleCountryChange = (event) => {
    setSelectedCountryId(event.target.value);
    setPage(1); // Reset to first page
  };

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      {/* Add Button */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add text="Add Package Name" width="w-[200px]" onClick={handleAdd} />
      </div>

      {/* Country Selector */}
      <div className="mb-4">
        <FormControl fullWidth>
          <InputLabel>Select Country</InputLabel>
          <Select
            value={selectedCountryId}
            onChange={handleCountryChange}
            label="Select Country"
          >
            {countryOptions.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.package_country_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Package Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r border-gray-300 font-bold text-base">
                ID
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Package Name
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
                <TableCell className="border-r border-gray-300">
                  {row.package_name}
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
            count={Math.ceil(packages.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default PackageName;
