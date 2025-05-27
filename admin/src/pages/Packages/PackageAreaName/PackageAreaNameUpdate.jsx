import React, { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

// Custom styled input
const BlueTextField = styled(TextField)({
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const PackageAreaNameUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const areaData = location.state?.packageAreaData;

  const [formData, setFormData] = useState({
    id: "",
    package_state_id: "",
    package_area_name: "",
  });

  const [stateOptions, setStateOptions] = useState([]);
  const [errors, setErrors] = useState({
    package_state_id: false,
    package_area_name: false,
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch all states
    axios
      .get(`${BE_URL}/packageStateName`)
      .then((res) => setStateOptions(res.data.data))
      .catch((err) => console.error("State fetch failed:", err));

    // Set existing data
    if (areaData) {
      setFormData({
        id: areaData.id,
        package_state_id: areaData.package_state_id,
        package_area_name: areaData.package_area_name,
      });
    } else {
      navigate("/package-area-name");
    }
  }, [areaData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      package_state_id: formData.package_state_id === "",
      package_area_name: formData.package_area_name.trim() === "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const res = await axios.put(
        `${BE_URL}/packageAreaName/${formData.id}`,
        formData
      );
      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        setFormData({
          id: "",
          package_state_id: "",
          package_area_name: "",
        });
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    navigate("/package-area-name");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Package Area Name
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* State Dropdown */}
          <div>
            <BlueTextField
              select
              label="Select State"
              name="package_state_id"
              value={formData.package_state_id}
              onChange={handleChange}
              fullWidth
              required
              error={errors.package_state_id}
              helperText={
                errors.package_state_id ? "Please select a state" : ""
              }
            >
              {stateOptions.map((state) => (
                <MenuItem key={state.id} value={state.id}>
                  {state.package_state_name}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Area Name Field */}
          <div>
            <BlueTextField
              label="Area Name"
              name="package_area_name"
              value={formData.package_area_name}
              onChange={handleChange}
              fullWidth
              required
              error={errors.package_area_name}
              helperText={
                errors.package_area_name ? "Please enter area name" : ""
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {success && <UpdateData />}
    </div>
  );
};

export default PackageAreaNameUpdate;
