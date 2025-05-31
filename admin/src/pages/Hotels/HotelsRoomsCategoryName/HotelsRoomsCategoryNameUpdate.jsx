import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";

const HotelsRoomsCategoryNameUpdate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const rowData = state?.rowData;

  const [hotelList, setHotelList] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [roomCategoryName, setRoomCategoryName] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchHotels();
    if (rowData) {
      setSelectedHotelId(rowData.hotel_id);
      setRoomCategoryName(rowData.room_category_name);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${BE_URL}/hotelRoomCategoryName/${rowData.id}`, {
        hotel_id: selectedHotelId,
        room_category_name: roomCategoryName,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/hotels-rooms-category-name");
      }, 2500);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Room Category Name
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <TextField
            label="Room Category Name"
            value={roomCategoryName}
            onChange={(e) => setRoomCategoryName(e.target.value)}
            fullWidth
            required
          />

          <div className="flex justify-end gap-4">
            <Update type="submit" />
            <Cancel onClick={() => navigate("/hotels-rooms-category-name")} />
          </div>
        </form>
      </div>

      {success && <UpdateData />}
    </div>
  );
};

export default HotelsRoomsCategoryNameUpdate;
