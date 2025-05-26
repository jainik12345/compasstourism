import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";

const BlueTextField = styled(TextField)({
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const PackageAreaNameInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    package_state_id: "",
    package_area_name: "",
  });

  const [stateOptions, setStateOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${BE_URL}/packageStateName`)
      .then((res) => setStateOptions(res.data.data))
      .catch((err) => console.error("State fetch failed:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
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
      const res = await axios.post(`${BE_URL}/packageAreaName`, formData);
      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          package_state_id: "",
          package_area_name: "",
        });
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
    navigate("/package-area-name");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Package Area Name
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* State Dropdown */}
          <div>
            <BlueTextField
              select
              label="Select State"
              name="package_state_id"
              value={formData.package_state_id}
              onChange={handleInputChange}
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

          {/* Area Name Input */}
          <div>
            <BlueTextField
              label="Area Name"
              name="package_area_name"
              value={formData.package_area_name}
              onChange={handleInputChange}
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
            <Submit type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {success && <SubmitData />}
    </div>
  );
};

export default PackageAreaNameInsert;
