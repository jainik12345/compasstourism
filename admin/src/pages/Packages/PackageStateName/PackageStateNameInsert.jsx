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

const PackageStateNameInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    package_country_id: "",
    package_state_name: "",
  });

  const [countryOptions, setCountryOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${BE_URL}/packageCountry`)
      .then((res) => setCountryOptions(res.data.data))
      .catch((err) => console.error("Country fetch failed:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      package_country_id: formData.package_country_id === "",
      package_state_name: formData.package_state_name.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const res = await axios.post(`${BE_URL}/packageStateName`, formData);
      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          package_country_id: "",
          package_state_name: "",
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
    navigate("/package-state-name");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Package State Name
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Country Dropdown */}
          <div>
            <BlueTextField
              select
              label="Select Country"
              name="package_country_id"
              value={formData.package_country_id}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.package_country_id}
              helperText={
                errors.package_country_id ? "Please select a country" : ""
              }
            >
              {countryOptions.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.package_country_name}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* State Name Input */}
          <div>
            <BlueTextField
              label="State Name"
              name="package_state_name"
              value={formData.package_state_name}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.package_state_name}
              helperText={
                errors.package_state_name ? "Please enter state name" : ""
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

export default PackageStateNameInsert;
