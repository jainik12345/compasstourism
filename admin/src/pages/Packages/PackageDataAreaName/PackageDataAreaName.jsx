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

const PackageDataAreaName = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [packageTitles, setPackageTitles] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [areaMappings, setAreaMappings] = useState([]);
  const [areaNameMap, setAreaNameMap] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const navigate = useNavigate();

  // Fetch all package data titles
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageDataDetails`)
      .then((res) => setPackageTitles(res.data.data))
      .catch((err) =>
        console.error("Failed to fetch package data titles:", err)
      );
  }, []);

  // Fetch area names and mapping data
  useEffect(() => {
    if (selectedPackageId) {
      // Fetch mappings
      axios
        .get(`${BE_URL}/packageDataAreaName/data/${selectedPackageId}`)
        .then((res) => setAreaMappings(res.data.data))
        .catch((err) => console.error("Failed to fetch mappings:", err));

      // Fetch all area names
      axios
        .get(`${BE_URL}/packageAreaName`)
        .then((res) => {
          const map = {};
          res.data.data.forEach((area) => {
            map[area.id] = area.package_area_name;
          });
          setAreaNameMap(map);
        })
        .catch((err) => console.error("Failed to fetch area names:", err));
    } else {
      setAreaMappings([]);
    }
  }, [selectedPackageId]);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/packageDataAreaName/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setAreaMappings((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleAdd = () => {
    navigate("/package-data-area-name/insert");
  };

  const handleUpdate = (item) => {
    navigate("/package-data-area-name/update", {
      state: { mappingData: item },
    });
  };

  const handleTraceClick = () => {
    navigate("/package-data-area-name/trace");
  };

  const handlePackageChange = (event) => {
    setSelectedPackageId(event.target.value);
    setPage(1);
  };

  const displayedRows = areaMappings.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      <div className="flex justify-between mb-6">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add Package Data Area Mapping"
          width="w-[330px]"
          onClick={handleAdd}
        />
      </div>

      {/* Package Title Selector */}
      <div className="mb-6">
        <FormControl fullWidth>
          <InputLabel>Select Package Title</InputLabel>
          <Select
            value={selectedPackageId}
            onChange={handlePackageChange}
            label="Select Package Title"
          >
            {packageTitles.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.data_title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <hr className="border-gray-300 mb-6" />

      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r border-gray-300 font-bold text-base">
                ID
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
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
                <TableCell className="border-r border-gray-300">
                  {areaNameMap[row.area_id] || "Unknown"}
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

        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(areaMappings.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default PackageDataAreaName;
