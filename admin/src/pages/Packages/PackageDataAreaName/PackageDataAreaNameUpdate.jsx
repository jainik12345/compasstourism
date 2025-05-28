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
  marginBottom: "1rem",
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const PackageDataAreaNameUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedData = location.state?.mappingData;

  const [formData, setFormData] = useState({
    package_data_id: "",
    area_id: "",
    id: "",
  });

  const [packageDataOptions, setPackageDataOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [errors, setErrors] = useState({
    package_data_id: false,
    area_id: false,
  });
  const [success, setSuccess] = useState(false);

  // Fetch all package titles
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageDataDetails`)
      .then((res) => {
        setPackageDataOptions(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch package data titles:", err);
      });
  }, []);

  // Initialize form data from selected mapping
  useEffect(() => {
    if (selectedData) {
      setFormData({
        package_data_id: selectedData.package_data_id,
        area_id: selectedData.area_id,
        id: selectedData.id,
      });
    } else {
      navigate("/package-data-area-name");
    }
  }, [selectedData, navigate]);

  // Fetch area names based on selected package
  // useEffect(() => {
  //   if (formData.package_data_id) {
  //     axios
  //       .get(
  //         `${BE_URL}/packageDataAreaName/area-names/${formData.package_data_id}`
  //       )
  //       .then((res) => {
  //         setAreaOptions(res.data.data);
  //       })
  //       .catch((err) => {
  //         console.error("Failed to fetch area names:", err);
  //       });
  //   } else {
  //     setAreaOptions([]);
  //   }
  // }, [formData.package_data_id]);

  // Fetch all area names once (not based on package)
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageAreaName`)
      .then((res) => {
        setAreaOptions(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch area names:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "package_data_id" && { area_id: "" }),
    }));

    if (value !== "") {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
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
      const res = await axios.put(
        `${BE_URL}/packageDataAreaName/${formData.id}`,
        formData
      );
      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/package-data-area-name");
        }, 2000);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleCancel = () => {
    navigate("/package-data-area-name");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Package Data Area Name
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <BlueTextField
            select
            label="Select Package Title"
            name="package_data_id"
            value={formData.package_data_id}
            onChange={handleChange}
            fullWidth
            required
            error={errors.package_data_id}
            helperText={
              errors.package_data_id ? "Please select a package title" : ""
            }
          >
            {packageDataOptions.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.data_title}
              </MenuItem>
            ))}
          </BlueTextField>
          {/* 
          <BlueTextField
            select
            label="Select Area Name"
            name="area_id"
            value={formData.area_id}
            onChange={handleChange}
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
          </BlueTextField> */}

          <BlueTextField
            select
            label="Select Area Name"
            name="area_id"
            value={formData.area_id}
            onChange={handleChange}
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

export default PackageDataAreaNameUpdate;
