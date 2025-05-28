import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import BE_URL from "../../../config";
import { useNavigate } from "react-router-dom";
import Add from "../../../components/Buttons/Add";
import Trace from "../../../components/Buttons/Trace";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteData from "./../../../components/Popup/DeleteData";

const PackageDataDetails = () => {
  const [packageNames, setPackageNames] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [details, setDetails] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BE_URL}/packageName`)
      .then((res) => setPackageNames(res.data.data))
      .catch((err) => console.error("Failed to fetch package names:", err));
  }, []);

  const fetchCityName = async (id) => {
    if (!id || id === 0) return "-";
    try {
      const res = await axios.get(`${BE_URL}/packageAreaName/data/${id}`);
      if (
        res.data &&
        Array.isArray(res.data.data) &&
        res.data.data.length > 0
      ) {
        return res.data.data[0].package_area_name || "-";
      }
      return "-";
    } catch {
      return "-";
    }
  };

  const fetchStateName = async (id) => {
    if (!id || id === 0) return "-";
    try {
      const res = await axios.get(`${BE_URL}/packageStateName/data/${id}`);
      return res.data?.data?.[0]?.package_state_name || "-";
    } catch {
      return "-";
    }
  };

  useEffect(() => {
    if (!selectedPackageId) {
      setDetails([]);
      return;
    }

    axios
      .get(`${BE_URL}/packageDataDetails/byPackageId/${selectedPackageId}`)
      .then(async (res) => {
        const items = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];

        const enriched = await Promise.all(
          items.map(async (item) => {
            const fromCityName = await fetchCityName(item.from_city_id);
            const toCityName = await fetchCityName(item.to_city_id);
            const stateName = await fetchStateName(item.state_id);
            return {
              ...item,
              state_name: stateName,
              from_city_name: fromCityName,
              to_city_name: toCityName,
              multiple_images: item.multiple_images || [],
              inclusions: item.inclusions || [],
              attraction: item.attraction || [],
              faqs: item.faqs || [],
              highlight: item.highlight || [],
            };
          })
        );

        setDetails(enriched);
      })
      .catch((err) => console.error("Failed to fetch details:", err));
  }, [selectedPackageId]);

  const handleAdd = () => {
    navigate("/package-data-details/insert");
  };

  const handleTraceClick = () => {
    navigate("/package-data-details/trace");
  };

  const handleUpdate = (item) => {
    navigate("/package-data-details/update", {
      state: { packageStateData: item },
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/packageDataDetails/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          // Remove from local state
          setDetails((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true); // Show popup
          setTimeout(() => setDeleteSuccess(false), 2500); // Hide popup after 2.5s
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
      });
  };

  return (
    <div className="p-6 rounded-xl bg-white">
      {deleteSuccess && <DeleteData />}
      <div className="justify-between mb-4 flex">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add Package State Name"
          width="w-[250px]"
          onClick={handleAdd}
        />
      </div>

      <FormControl fullWidth margin="normal">
        <InputLabel>Select Package Name</InputLabel>
        <Select
          value={selectedPackageId}
          onChange={(e) => setSelectedPackageId(e.target.value)}
          label="Select Package Name"
        >
          {packageNames.map((pkg) => (
            <MenuItem key={pkg.id} value={pkg.id}>
              {pkg.package_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {details.length > 0 ? (
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>State Name</TableCell>
                <TableCell>Data Title</TableCell>
                <TableCell>Single Image</TableCell>
                <TableCell>Night</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Multiple Images</TableCell>
                <TableCell>Inclusions</TableCell>
                <TableCell>From City</TableCell>
                <TableCell>To City</TableCell>
                <TableCell>Attraction</TableCell>
                <TableCell>FAQs</TableCell>
                <TableCell>Highlight</TableCell>
                <TableCell className="font-bold text-base">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.state_name}</TableCell>
                  <TableCell>{item.data_title}</TableCell>
                  <TableCell>
                    <img
                      src={`${BE_URL}/Images/PackageImages/PackageDataDetails/${item.single_image}`}
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.night}</TableCell>
                  <TableCell>{item.day}</TableCell>

                  {/* Scrollable Description */}
                  <TableCell>{item.data_description}</TableCell>

                  {/* Scrollable Multiple Images */}
                  <TableCell sx={{ maxHeight: 120, overflowY: "auto" }}>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {item.multiple_images.map((img, idx) => (
                        <img
                          key={idx}
                          src={`${BE_URL}/Images/PackageImages/PackageDataDetails/${img}`}
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                        />
                      ))}
                    </Box>
                  </TableCell>

                  {/* Inclusions */}
                  <TableCell sx={{ maxHeight: 120, overflowY: "auto" }}>
                    <ul style={{ paddingLeft: 16 }}>
                      {item.inclusions.map((inc, i) => (
                        <li key={i}>{inc}</li>
                      ))}
                    </ul>
                  </TableCell>

                  <TableCell>{item.from_city_name}</TableCell>
                  <TableCell>{item.to_city_name}</TableCell>

                  {/* Attraction */}
                  <TableCell sx={{ maxHeight: 120, overflowY: "auto" }}>
                    <ul style={{ paddingLeft: 16 }}>
                      {item.attraction.map((att, i) => (
                        <li key={i}>{att}</li>
                      ))}
                    </ul>
                  </TableCell>

                  {/* FAQs */}
                  <TableCell>
                    <ul style={{ paddingLeft: 16 }}>
                      {item.faqs.map((faq, i) => (
                        <li key={i}>
                          <strong>Q:</strong> {faq.question} <br />
                          <strong>A:</strong> {faq.answer}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{item.highlight}</TableCell>
                  <TableCell>
                    <div className="flex space-x-4">
                      <button
                        className="text-green-600  cursor-pointer hover:text-green-800"
                        onClick={() => handleUpdate(item)}
                      >
                        <FaEdit size={22} />
                      </button>
                      <button
                        className="text-red-600 cursor-pointer hover:text-red-800"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash size={22} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" color="textSecondary" className="mt-4">
          No data available for the selected package.
        </Typography>
      )}
    </div>
  );
};

export default PackageDataDetails;
