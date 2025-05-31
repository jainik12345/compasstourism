import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";

const HotelsAboutInsert = () => {
  const navigate = useNavigate();
  const [hotelId, setHotelId] = useState("");
  const [about, setAbout] = useState("");
  const [hotels, setHotels] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch hotel list on component mount
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hotelId || !about.trim()) {
      setErrorMsg("Please select a hotel and enter about content.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(`${BE_URL}/hotelAbout`, {
        hotel_id: hotelId,
        about,
      });

      if (response.data.status === "success") {
        setSuccess(true);
        setHotelId("");
        setAbout("");
        setTimeout(() => setSuccess(false), 2500);
      } else {
        setErrorMsg("Failed to insert data. Please try again.");
      }
    } catch (error) {
      console.error("Insert error:", error);
      setErrorMsg(error.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/hotels-about");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Hotel About
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

          {/* About Textarea */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Hotel About Description
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={5}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter about text for the hotel..."
              required
            />
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

export default HotelsAboutInsert;
