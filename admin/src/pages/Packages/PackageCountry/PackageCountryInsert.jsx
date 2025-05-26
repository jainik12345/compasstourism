import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import axios from "axios";
import BE_URL from "../../../config";

const PackageCountryInsert = () => {
  const navigate = useNavigate();
  const [countryName, setCountryName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!countryName.trim()) {
      console.log("Validation failed: Country name is required");
      return;
    }

    try {
      const res = await axios.post(`${BE_URL}/packageCountry`, {
        package_country_name: countryName,
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setCountryName("");
      } else {
        alert("Something went wrong while saving.");
      }
    } catch (err) {
      console.error("Error saving country:", err);
      alert("Failed to save country.");
    }
  };

  const handleCancel = () => {
    navigate("/package-country");
  };

  // Auto-hide success popup
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
          Add Package Country
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Country Name Field */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Country Name
            </label>
            <input
              type="text"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter country name"
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

export default PackageCountryInsert;
