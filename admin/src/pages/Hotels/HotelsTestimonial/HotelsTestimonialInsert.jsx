import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";

const HotelsTestimonialInsert = () => {
  const navigate = useNavigate();
  const [hotelId, setHotelId] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
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

    if (!hotelId || !description.trim() || !name.trim()) {
      setErrorMsg("Please select a hotel and enter description and name.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(`${BE_URL}/hotelTestimonial`, {
        hotel_id: hotelId,
        description,
        name,
      });

      if (response.data.status === "success") {
        setSuccess(true);
        setHotelId("");
        setDescription("");
        setName("");
        setTimeout(() => setSuccess(false), 2500);
      } else {
        setErrorMsg("Failed to insert data. Please try again.");
      }
    } catch (error) {
      console.error("Insert error:", error);
      setErrorMsg(
        error.response?.data?.error || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/hotels-testimonial");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Hotel Testimonial
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

          {/* Description Textarea */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Testimonial Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter testimonial description for the hotel..."
              required
            />
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter name"
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

export default HotelsTestimonialInsert;
