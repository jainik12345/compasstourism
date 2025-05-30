import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import axios from "axios";
import BE_URL from "../../../config";

const HotelsCityNameInsert = () => {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName.trim()) {
      console.log("Validation failed: City name is required");
      return;
    }

    try {
      const res = await axios.post(`${BE_URL}/hotelCityName`, {
        city_name: cityName,
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setCityName("");
      } else {
        alert("Something went wrong while saving.");
      }
    } catch (err) {
      console.error("Error saving city:", err);
      alert("Failed to save city.");
    }
  };

  const handleCancel = () => {
    navigate("/hotels-city-name");
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Hotel City Name
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* City Name Field */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              City Name
            </label>
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter city name"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Submit type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {success && <SubmitData />}
    </div>
  );
};

export default HotelsCityNameInsert;
