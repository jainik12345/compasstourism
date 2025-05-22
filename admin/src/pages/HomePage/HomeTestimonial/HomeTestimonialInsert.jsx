import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";

const HomeTestimonialInsert = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || !name.trim()) {
      console.log("Validation failed: Fields are required");
      return;
    }

    // Show success popup
    setSuccess(true);

    // Reset form
    setDescription("");
    setName("");
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
          {/* Description Input */}
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

          {/* Name Input */}
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

export default HomeTestimonialInsert;
