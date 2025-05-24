import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";
import axios from "axios";

const HomeTestimonialInsert = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim() || !name.trim()) {
      setError("Description and Name are required");
      return;
    }

    try {
      // ✅ Use BE_URL from your config
      const response = await axios.post(`${BE_URL}/homeTestimonial`, {
        description,
        name,
      });

      if (response.data.status === "success") {
        setSuccess(true);
        setError(null);
        setDescription("");
        setName("");
      } else {
        setError("Failed to insert testimonial");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleCancel = () => {
    navigate("/home-testimonial");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Testimonial
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter testimonial description"
              required
            />
          </div>

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
          </div>

          {error && <p className="text-red-600 font-semibold">{error}</p>}

          <div className="flex justify-end gap-4">
            <Submit type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {success && <SubmitData />}
    </div>
  );
};

export default HomeTestimonialInsert;
