import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";

// Styled input field
const BlueTextField = styled(TextField)({
  color: "black", // <- Add this line
  "& label.Mui-focused": {
    color: "#1976d2",
  },
  "& .MuiInputBase-input": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#1976d2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#1976d2",
    },
    "&:hover fieldset": {
      borderColor: "#1565c0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
});

const PackageDataAreaNameInsert = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    package_data_id: "",
    area_id: "",
  });

  const [dataTitleOptions, setDataTitleOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Fetch package data titles
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageDataDetails`)
      .then((res) => setDataTitleOptions(res.data.data))
      .catch((err) => console.error("Data title fetch failed:", err));
  }, []);

  // Fetch area names
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageAreaName`)
      .then((res) => setAreaOptions(res.data.data))
      .catch((err) => console.error("Area fetch failed:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      package_data_id: formData.package_data_id === "",
      area_id: formData.area_id === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const res = await axios.post(`${BE_URL}/packageDataAreaName`, formData);
      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({ package_data_id: "", area_id: "" });
        setTimeout(() => {
          setSuccess(false);
        }, 2500);
      } else {
        alert("Insert failed");
      }
    } catch (error) {
      console.error("Insert error:", error);
      alert("An error occurred");
    }
  };

  const handleCancel = () => {
    navigate("/package-data-area-name");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Package Data Area Mapping
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Package Data Title Dropdown */}
          <div>
            <BlueTextField
              select
              label="Select Package Data Title"
              name="package_data_id"
              value={formData.package_data_id}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.package_data_id}
              helperText={
                errors.package_data_id ? "Please select a package title" : ""
              }
            >
              {dataTitleOptions.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.data_title}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Area Dropdown */}
          <div>
            <BlueTextField
              select
              label="Select Area Name"
              name="area_id"
              value={formData.area_id}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.area_id}
              helperText={errors.area_id ? "Please select an area name" : ""}
            >
              {areaOptions.map((area) => (
                <MenuItem key={area.id} value={area.id}>
                  {area.package_area_name}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Submit type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {success && <SubmitData />}
    </div>
  );
};

export default PackageDataAreaNameInsert;
