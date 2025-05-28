import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
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

const PackageNameUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const packageData = location.state?.packageData;

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const [formData, setFormData] = useState({
    package_name: "",
    package_country_id: "",
    id: "",
  });

  const [countryOptions, setCountryOptions] = useState([]);
  const [errors, setErrors] = useState({
    package_name: false,
    package_country_id: false,
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch countries
    axios
      .get(`${BE_URL}/packageCountry`)
      .then((res) => {
        if (res.data?.data) setCountryOptions(res.data.data);
      })
      .catch((err) => {
        console.error("Country fetch failed:", err);
      });

    if (packageData) {
      setFormData({
        package_name: packageData.package_name,
        id: packageData.id,
        package_country_id: packageData.package_country_id,
      });
      setCurrentImage(packageData.image || null);
    } else {
      navigate("/package-name");
    }
  }, [packageData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const newErrors = {
  //     package_name: formData.package_name.trim() === "",
  //     package_country_id: formData.package_country_id === "",
  //   };
  //   setErrors(newErrors);

  //   if (Object.values(newErrors).some((val) => val)) return;

  //   try {
  //     const res = await axios.put(
  //       `${BE_URL}/packageName/${formData.id}`,
  //       formData
  //     );
  //     if (res.data.status === "success") {
  //       setSuccess(true);
  //       setTimeout(() => setSuccess(false), 2500);
  //       setFormData({
  //         package_name: "",
  //         id: "",
  //         package_country_id: "",
  //       });
  //     } else {
  //       console.error("Update failed");
  //     }
  //   } catch (err) {
  //     console.error("Update error:", err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      package_name: formData.package_name.trim() === "",
      package_country_id: formData.package_country_id === "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((val) => val)) return;

    try {
      const data = new FormData();
      data.append("package_name", formData.package_name);
      data.append("package_country_id", formData.package_country_id);
      if (selectedImage) {
        data.append("image", selectedImage);
      }

      const res = await axios.put(
        `${BE_URL}/packageName/${formData.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        // Optionally reset form or navigate away here
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    navigate("/package-name");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Package Name
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Country Selector */}
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

          {/* Package Name Field */}
          <div>
            <BlueTextField
              label="Package Name"
              name="package_name"
              value={formData.package_name}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.package_name}
              helperText={
                errors.package_name ? "Please enter package name" : ""
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Package Image</label>
            {currentImage && !selectedImage && (
              <img
                src={`${BE_URL}/Images/PackageImages/PackageNameImages/${currentImage}`}
                alt="Current Package"
                style={{
                  width: "120px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              />
            )}

            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Preview"
                style={{
                  width: "120px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setSelectedImage(e.target.files[0]);
                setCurrentImage(null);
              }}
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

export default PackageNameUpdate;
