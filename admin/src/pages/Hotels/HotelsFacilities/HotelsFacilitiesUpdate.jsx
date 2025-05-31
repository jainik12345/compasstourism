import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";

const HotelsFacilitiesUpdate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const rowData = state?.rowData;

  const [hotelList, setHotelList] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [title, setTitle] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [success, setSuccess] = useState(false);

  const id = rowData?.id;

  useEffect(() => {
    fetchHotels();
    if (rowData) {
      setSelectedHotelId(rowData.hotel_id);
      setTitle(rowData.title || "");
      setExistingImage(rowData.image || "");
      setPreviewImage(""); // Clear preview if any
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
    const file = e.target.files[0];
    setNewImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : "");
  };

  const removeExistingImage = () => {
    setExistingImage("");
  };

  const removeNewImage = () => {
    setNewImage(null);
    setPreviewImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHotelId) {
      alert("Please select a hotel");
      return;
    }
    if (!title.trim()) {
      alert("Please enter a facility title");
      return;
    }
    if (!existingImage && !newImage) {
      alert("Please provide a facility image");
      return;
    }

    const formData = new FormData();
    formData.append("hotel_id", selectedHotelId);
    formData.append("title", title);
    formData.append(
      "existingImage",
      existingImage ? existingImage.split("/").pop() : ""
    );
    if (newImage) formData.append("image", newImage);

    try {
      await axios.put(`${BE_URL}/hotelFacilities/${id}`, formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/hotels-facilities");
      }, 2500);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Hotel Facility
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
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
              Facility Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter facility title"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Current Image
            </label>
            {existingImage ? (
              <div className="relative inline-block mr-3">
                <img
                  src={existingImage}
                  alt="existing"
                  className="w-24 h-24 rounded object-cover"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                  onClick={removeExistingImage}
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Upload New Image (optional)
            </label>
            <input
              type="file"
              onChange={handleNewImageChange}
              accept="image/*"
              className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
            />
            {previewImage && (
              <div className="relative inline-block mt-3">
                <img
                  src={previewImage}
                  alt="preview"
                  className="w-24 h-24 rounded object-cover"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                  onClick={removeNewImage}
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Update type="submit" />
            <Cancel onClick={() => navigate("/hotels-facilities")} />
          </div>
        </form>
      </div>

      {success && <UpdateData />}
    </div>
  );
};

export default HotelsFacilitiesUpdate;
