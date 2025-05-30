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

const HotelsNameUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hotelData = location.state?.hotelData;

  const [formData, setFormData] = useState({
    hotel_city_id: "",
    hotel_name: "",
    hotel_description: "",
    hotel_price: "",
    id: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [errors, setErrors] = useState({
    hotel_city_id: false,
    hotel_name: false,
    hotel_price: false,
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${BE_URL}/hotelCityName`)
      .then((res) => {
        if (res.data?.data) setCityOptions(res.data.data);
      })
      .catch((err) => console.error("City fetch failed:", err));

    if (hotelData) {
      setFormData({
        hotel_city_id: hotelData.hotel_city_id,
        hotel_name: hotelData.hotel_name,
        hotel_description: hotelData.hotel_description || "",
        hotel_price: hotelData.hotel_price,
        id: hotelData.id,
      });
      setPreviewUrl(`${BE_URL}/Images/HotelImages/HotelsNameImage/${hotelData.hotel_image}`);
    } else {
      navigate("/hotels-name");
    }
  }, [hotelData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      hotel_city_id: formData.hotel_city_id === "",
      hotel_name: formData.hotel_name.trim() === "",
      hotel_price: formData.hotel_price.trim() === "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((val) => val)) return;

    try {
      const data = new FormData();
      data.append("hotel_city_id", formData.hotel_city_id);
      data.append("hotel_name", formData.hotel_name);
      data.append("hotel_description", formData.hotel_description);
      data.append("hotel_price", formData.hotel_price);
      data.append("existingImage", previewUrl?.split("/").pop() || "");
      if (image) data.append("hotel_image", image);

      const res = await axios.put(`${BE_URL}/hotelName/${formData.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5500);
        navigate("/hotels-name");
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    navigate("/hotels-name");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Hotel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* City Select */}
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

          {/* Hotel Name */}
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

          {/* Description */}
          <BlueTextField
            label="Hotel Description"
            name="hotel_description"
            value={formData.hotel_description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />

          {/* Price */}
          <BlueTextField
            label="Hotel Price"
            name="hotel_price"
            value={formData.hotel_price}
            onChange={handleInputChange}
            fullWidth
            type="number"
            required
            error={errors.hotel_price}
            helperText={errors.hotel_price ? "Please enter hotel price" : ""}
          />

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 max-w-xs border rounded"
              />
            )}
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

export default HotelsNameUpdate;
