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
  marginBottom: "1rem",
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const PackageNameInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    package_country_id: "",
    package_name: "",
  });
  const [imageFile, setImageFile] = useState(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      package_country_id: formData.package_country_id === "",
      package_name: formData.package_name.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    const data = new FormData();
    data.append("package_country_id", formData.package_country_id);
    data.append("package_name", formData.package_name);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await axios.post(`${BE_URL}/packageName`, data);
      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({ package_country_id: "", package_name: "" });
        setImageFile(null);
        setTimeout(() => setSuccess(false), 2500);
      } else {
        alert("Insert failed");
      }
    } catch (error) {
      console.error("Insert error:", error);
      alert("An error occurred");
    }
  };

  const handleCancel = () => {
    navigate("/package-name");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Package Name
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Country Dropdown */}
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

          {/* Package Name Input */}
          <BlueTextField
            label="Package Name"
            name="package_name"
            value={formData.package_name}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.package_name}
            helperText={errors.package_name ? "Please enter package name" : ""}
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Package Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
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

export default PackageNameInsert;
