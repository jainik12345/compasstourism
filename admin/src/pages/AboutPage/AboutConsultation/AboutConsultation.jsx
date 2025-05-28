import React, { useState, useEffect } from "react";
import Submit from "../../../components/Buttons/Submit";
import Update from "../../../components/Buttons/Update";

import SubmitData from "../../../components/Popup/SubmitData";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const AboutConsultation = () => {
  const [form, setForm] = useState({
    partners: "",
    listed_hotels: "",
    destinations: "",
    booking: "",
  });
  const [exists, setExists] = useState(false);
  const [successType, setSuccessType] = useState("");

  useEffect(() => {
    axios
      .get(`${BE_URL}/aboutConsultation`)
      .then((res) => {
        if (res.data?.data) {
          setForm(res.data.data);
          setExists(true);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiCall = exists
        ? axios.put(`${BE_URL}/aboutConsultation`, form)
        : axios.post(`${BE_URL}/aboutConsultation`, form);

      const res = await apiCall;
      if (res.data.status === "success") {
        setSuccessType(exists ? "update" : "insert");
        setExists(true);
      } else {
        alert("Something went wrong while saving.");
      }
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Failed to save data.");
    }
  };

  useEffect(() => {
    if (successType) {
      const timer = setTimeout(() => setSuccessType(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [successType]);

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          About Consultation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {["partners", "listed_hotels", "destinations", "booking"].map(
            (field) => (
              <div key={field}>
                <label className="block mb-2 text-blue-700 font-semibold">
                  {field
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </label>
                <input
                  type="number"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="border border-blue-500 rounded-md p-2 w-full"
                  required
                />
              </div>
            )
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            {exists ? <Update type="submit" /> : <Submit type="submit" />}
          </div>
        </form>
      </div>

      {/* Popup */}
      {successType === "insert" && <SubmitData />}
      {successType === "update" && <UpdateData />}
    </div>
  );
};

export default AboutConsultation;
