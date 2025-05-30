import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const HotelsCityNameUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cityName, setCityName] = useState("");
  const [success, setSuccess] = useState(false);
  const rowData = location.state?.rowData;

  useEffect(() => {
    if (rowData) {
      setCityName(rowData.city_name);
    }
  }, [rowData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName.trim()) {
      console.log("Validation failed: City name is required");
      return;
    }

    try {
      const res = await axios.put(`${BE_URL}/hotelCityName/${rowData.id}`, {
        city_name: cityName,
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          navigate("/hotels-city-name");
        }, 2500);
      }
    } catch (err) {
      console.error("Error updating city name:", err);
      alert("Failed to update city name");
    }
  };

  const handleCancel = () => {
    navigate("/hotels-city-name");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Hotel City Name
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
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

export default HotelsCityNameUpdate;
