import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";

const HotelsMultipleImagesUpdate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const rowData = state?.rowData;

  const [hotelList, setHotelList] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [success, setSuccess] = useState(false);

  const id = rowData?.id;

  useEffect(() => {
    fetchHotels();
    if (rowData) {
      setSelectedHotelId(rowData.hotel_id); // Assuming rowData contains hotel_id
      setExistingImages(rowData.images);
    }
  }, [rowData]);

  const fetchHotels = async () => {
    try {
      const res = await axios.get(`${BE_URL}/hotelName`);
      setHotelList(res.data.data);
    } catch (err) {
      console.error("Failed to fetch hotels", err);
    }
  };

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHotelId) {
      alert("Please select a hotel");
      return;
    }

    if (existingImages.length === 0 && newImages.length === 0) {
      alert("Please provide at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("hotel_id", selectedHotelId);
    formData.append(
      "existingImages",
      JSON.stringify(existingImages.map((img) => img.split("/").pop()))
    );
    newImages.forEach((file) => formData.append("images", file));

    try {
      await axios.put(`${BE_URL}/hotelMultipleImages/${id}`, formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/hotels-multiple-images");
      }, 2500);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Hotel Multiple Images
        </h2>

        <form onSubmit={handleSubmit}  className="space-y-8">
          <FormControl fullWidth>
            <InputLabel>Select Hotel</InputLabel>
            <Select
              value={selectedHotelId}
              label="Select Hotel"
              onChange={(e) => setSelectedHotelId(e.target.value)}
              required
            >
              {hotelList.map((hotel) => (
                <MenuItem key={hotel.id} value={hotel.id}>
                  {hotel.hotel_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Current Images
            </label>
            <div className="flex space-x-3 overflow-x-auto max-w-[600px]">
              {existingImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    alt={`existing-${i}`}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                    onClick={() => removeExistingImage(i)}
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Upload New Images (optional)
            </label>
            <input
              type="file"
              onChange={handleNewImageChange}
              multiple
              accept="image/*"
              className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
            />
            {previewImages.length > 0 && (
              <div className="flex space-x-3 mt-4 overflow-x-auto max-w-[600px]">
                {previewImages.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      alt={`preview-${i}`}
                      className="w-24 h-24 rounded object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                      onClick={() => removeNewImage(i)}
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Update type="submit" />
            <Cancel onClick={() => navigate("/hotels-multiple-images")} />
          </div>
        </form>
      </div>

      {success && <UpdateData />}
    </div>
  );
};

export default HotelsMultipleImagesUpdate;
