import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";

const HotelsFacilitiesInsert = () => {
  const navigate = useNavigate();
  const [hotelId, setHotelId] = useState("");
  const [hotels, setHotels] = useState([]);
  const [facilityTitle, setFacilityTitle] = useState("");
  const [facilityImage, setFacilityImage] = useState(null);
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

  const handleImageChange = (e) => {
    setErrorMsg("");
    setFacilityImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hotelId) {
      setErrorMsg("Please select a hotel.");
      return;
    }
    if (!facilityTitle.trim()) {
      setErrorMsg("Please enter a facility title.");
      return;
    }
    if (!facilityImage) {
      setErrorMsg("Please select a facility image.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("hotel_id", hotelId);
      formData.append("title", facilityTitle);
      formData.append("image", facilityImage);

      const response = await axios.post(
        `${BE_URL}/hotelFacilities`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        setSuccess(true);
        setHotelId("");
        setFacilityTitle("");
        setFacilityImage(null);
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";

        setTimeout(() => setSuccess(false), 2500);
      } else {
        setErrorMsg("Failed to insert facility. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMsg(
        error.response?.data?.error || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/hotels-facilities");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Hotel Facility
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

          {/* Facility Title */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Facility Title
            </label>
            <input
              type="text"
              value={facilityTitle}
              onChange={(e) => setFacilityTitle(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter facility title"
              required
            />
          </div>

          {/* Facility Image Upload */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Facility Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
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

export default HotelsFacilitiesInsert;