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

const HotelsNameInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hotel_city_id: "",
    hotel_name: "",
    hotel_description: "",
    hotel_price: "",
    hotel_image: null,
  });

  const [cityOptions, setCityOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${BE_URL}/hotelCityName`)  
      .then((res) => setCityOptions(res.data.data))
      .catch((err) => console.error("City fetch failed:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      hotel_city_id: formData.hotel_city_id === "",
      hotel_name: formData.hotel_name.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const data = new FormData();
      data.append("hotel_city_id", formData.hotel_city_id);
      data.append("hotel_name", formData.hotel_name);
      data.append("hotel_description", formData.hotel_description);
      data.append("hotel_price", formData.hotel_price);
      if (formData.hotel_image) {
        data.append("hotel_image", formData.hotel_image);
      }

      const res = await axios.post(`${BE_URL}/hotelName`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          hotel_city_id: "",
          hotel_name: "",
          hotel_description: "",
          hotel_price: "",
          hotel_image: null,
        });
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
    navigate("/hotels-name");  
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Hotel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* City Dropdown */}
          <div>
            <BlueTextField
              select
              label="Select City"
              name="hotel_city_id"
              value={formData.hotel_city_id}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.hotel_city_id}
              helperText={errors.hotel_city_id ? "Please select a city" : ""}
            >
              {cityOptions.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.city_name}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Hotel Name Input */}
          <div>
            <BlueTextField
              label="Hotel Name"
              name="hotel_name"
              value={formData.hotel_name}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.hotel_name}
              helperText={errors.hotel_name ? "Please enter hotel name" : ""}
            />
          </div>

          {/* Description Input */}
          <div>
            <BlueTextField
              label="Hotel Description"
              name="hotel_description"
              value={formData.hotel_description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
            />
          </div>

          {/* Price Input */}
          <div>
            <BlueTextField
              label="Hotel Price"
              name="hotel_price"
              value={formData.hotel_price}
              onChange={handleInputChange}
              type="number"
              fullWidth
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Hotel Image
            </label>
            <input
              type="file"
              name="hotel_image"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  hotel_image: e.target.files[0],
                }))
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

export default HotelsNameInsert;
