import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import BE_URL from "../../../config";
import { FaRecycle } from "react-icons/fa";
import RestoreSuccess from "../../../components/Popup/RestoreData";
import { useNavigate } from "react-router-dom";
import Back from "../../../components/Buttons/Back";

const PackageDataDetailsTrace = () => {
  const [packageNames, setPackageNames] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [details, setDetails] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch package name options
    axios
      .get(`${BE_URL}/packageName`) // Or your actual endpoint
      .then((res) => setPackageNames(res.data.data || []))
      .catch((err) => console.error("Error loading package names:", err));
  }, []);

  useEffect(() => {
    if (!selectedPackageId) {
      setDetails([]);
      return;
    }

    axios
      .get(
        `${BE_URL}/packageDataDetails/trashed/by-package/${selectedPackageId}`
      )
      .then(async (res) => {
        const items = Array.isArray(res.data.data) ? res.data.data : [];

        const enriched = await Promise.all(
          items.map(async (item) => {
            const fromCity = await fetchCityName(item.from_city_id);
            const toCity = await fetchCityName(item.to_city_id);
            return {
              ...item,
              from_city_name: fromCity,
              to_city_name: toCity,
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
      .catch((err) => console.error("Error loading trashed data:", err));
  }, [selectedPackageId]);

  const fetchCityName = async (id) => {
    if (!id) return "-";
    try {
      const res = await axios.get(`${BE_URL}/packageAreaName/data/${id}`);
      return res.data.data?.[0]?.package_area_name || "-";
    } catch {
      return "-";
    }
  };

  const handleRestore = (id) => {
    axios
      .patch(`${BE_URL}/packageDataDetails/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setDetails((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => console.error("Restore error:", err));
  };

  return (
    <div className="p-6 rounded-xl bg-white">
      {restoreSuccess && <RestoreSuccess />}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Trashed State Names
        </h2>
        <Back onClick={() => navigate("/package-data-details")} />
      </div>

      {/* Dropdown to select Package Name */}
      <FormControl fullWidth size="small" className="mb-4">
        <InputLabel id="package-select-label">Select Package Name</InputLabel>
        <Select
          labelId="package-select-label"
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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
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
                  <TableCell>{item.data_description}</TableCell>
                  <TableCell>
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
                  <TableCell>
                    <ul>
                      {item.inclusions.map((inc, i) => (
                        <li key={i}>{inc}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{item.from_city_name}</TableCell>
                  <TableCell>{item.to_city_name}</TableCell>
                  <TableCell>
                    <ul>
                      {item.attraction.map((att, i) => (
                        <li key={i}>{att}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul>
                      {item.faqs.map((faq, i) => (
                        <li key={i}>
                          <strong>Q:</strong> {faq.question}
                          <br />
                          <strong>A:</strong> {faq.answer}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{item.highlight}</TableCell>
                  <TableCell>
                    <button
                      className="text-blue-600 cursor-pointer hover:text-blue-800"
                      onClick={() => handleRestore(item.id)}
                    >
                      <FaRecycle size={22} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        selectedPackageId && (
          <Typography variant="body1" color="textSecondary" className="mt-4">
            No trashed data found for selected package.
          </Typography>
        )
      )}
    </div>
  );
};

export default PackageDataDetailsTrace;
