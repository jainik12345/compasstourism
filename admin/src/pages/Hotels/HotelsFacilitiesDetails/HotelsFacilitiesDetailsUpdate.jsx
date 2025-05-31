import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FaPlus, FaTimes } from "react-icons/fa";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";

const HotelsFacilitiesDetailsUpdate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const rowData = state?.rowData;

  const [hotelList, setHotelList] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [heading, setHeading] = useState("");
  const [titles, setTitles] = useState([{ value: "" }]);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const id = rowData?.id;

  useEffect(() => {
    fetchHotels();
    if (rowData) {
      setSelectedHotelId(rowData.hotel_id || "");
      setHeading(rowData.heading || "");
      // Ensure the title is always in array form
      let parsedTitles = [];
      if (Array.isArray(rowData.title)) {
        parsedTitles = rowData.title;
      } else if (typeof rowData.title === "string") {
        try {
          parsedTitles = JSON.parse(rowData.title);
        } catch {
          parsedTitles = [];
        }
      }
      if (!parsedTitles || parsedTitles.length === 0) parsedTitles = [""];
      setTitles(parsedTitles.map((t) => ({ value: t })));
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

  // Title handlers
  const handleTitleChange = (idx, val) => {
    setTitles((prev) =>
      prev.map((t, i) => (i === idx ? { ...t, value: val } : t))
    );
  };

  const handleAddTitle = () => {
    setTitles((prev) => [...prev, { value: "" }]);
  };

  const handleRemoveTitle = (idx) => {
    setTitles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedHotelId) {
      setErrorMsg("Please select a hotel.");
      return;
    }
    if (!heading.trim()) {
      setErrorMsg("Please enter a heading.");
      return;
    }
    const filteredTitles = titles.map((t) => t.value.trim()).filter((t) => t);
    if (filteredTitles.length === 0) {
      setErrorMsg("Please enter at least one title.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        hotel_id: selectedHotelId,
        heading,
        title: filteredTitles,
      };
      await axios.put(`${BE_URL}/hotelFacilitiesDetails/${id}`, payload);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/hotels-facilitie-details");
      }, 2500);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Hotel Facilities Details
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
              Heading
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter heading"
              required
            />
          </div>

          {/* Titles */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold flex items-center">
              Titles
              <button
                type="button"
                onClick={handleAddTitle}
                className="ml-2 p-1 rounded-full bg-blue-100 hover:bg-blue-300 text-blue-700"
                title="Add Title"
              >
                <FaPlus />
              </button>
            </label>
            <div className="space-y-4">
              {titles.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={t.value}
                    onChange={(e) => handleTitleChange(idx, e.target.value)}
                    className="border border-blue-500 rounded-md p-2 w-full"
                    placeholder={`Title ${idx + 1}`}
                    required
                  />
                  {titles.length > 1 && (
                    <button
                      type="button"
                      className="p-2 rounded-full bg-red-100 hover:bg-red-300 text-red-700 flex items-center"
                      onClick={() => handleRemoveTitle(idx)}
                      title="Remove Title"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errorMsg && (
              <p className="mt-1 text-sm text-red-600">{errorMsg}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Update type="submit" disabled={loading} />
            <Cancel onClick={() => navigate("/hotels-facilitie-details")} />
          </div>
        </form>
      </div>
      {success && <UpdateData />}
    </div>
  );
};

export default HotelsFacilitiesDetailsUpdate;
