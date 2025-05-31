import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";
import { FaPlus, FaTimes } from "react-icons/fa";

const HotelsFacilitiesDetailsInsert = () => {
  const navigate = useNavigate();
  const [hotelId, setHotelId] = useState("");
  const [hotels, setHotels] = useState([]);
  const [heading, setHeading] = useState("");
  const [titles, setTitles] = useState([{ value: "" }]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch hotel names on mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${BE_URL}/hotelName`);
        setHotels(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch hotel names:", error);
      }
    };
    fetchHotels();
  }, []);

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

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hotelId) {
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
        hotel_id: hotelId,
        heading,
        title: filteredTitles, // send as array, backend should use JSON
      };
      const response = await axios.post(
        `${BE_URL}/hotelFacilitiesDetails`,
        payload
      );

      if (response.data.status === "success") {
        setSuccess(true);
        setHotelId("");
        setHeading("");
        setTitles([{ value: "" }]);
        setTimeout(() => setSuccess(false), 2500);
      } else {
        setErrorMsg("Failed to insert data. Please try again.");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.error || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  // Cancel
  const handleCancel = () => {
    navigate("/hotels-facilitie-details");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Hotel Facilities Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Hotel Selector */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Select Hotel
            </label>
            <select
              value={hotelId}
              onChange={(e) => setHotelId(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              required
            >
              <option value="">-- Select a Hotel --</option>
              {Array.isArray(hotels) &&
                hotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.hotel_name}
                  </option>
                ))}
            </select>
          </div>

          {/* Heading */}
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

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Submit type="submit" disabled={loading} />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>
      {/* Success Popup */}
      {success && <SubmitData />}
    </div>
  );
};

export default HotelsFacilitiesDetailsInsert;
