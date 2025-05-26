import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const PackageCountryUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countryName, setCountryName] = useState("");
  const [success, setSuccess] = useState(false);
  const rowData = location.state?.rowData;

  useEffect(() => {
    if (rowData) {
      setCountryName(rowData.package_country_name);
    }
  }, [rowData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!countryName.trim()) {
      console.log("Validation failed: Country name is required");
      return;
    }

    try {
      const res = await axios.put(`${BE_URL}/packageCountry/${rowData.id}`, {
        package_country_name: countryName,
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          navigate("/package-country");
        }, 2500);
      }
    } catch (err) {
      console.error("Error updating country:", err);
      alert("Failed to update country");
    }
  };

  const handleCancel = () => {
    navigate("/package-country");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Package Country
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
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

export default PackageCountryUpdate;
