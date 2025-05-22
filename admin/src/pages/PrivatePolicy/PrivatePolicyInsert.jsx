import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../components/Buttons/Submit";
import Cancel from "../../components/Buttons/Cancel";
import SubmitData from "../../components/Popup/SubmitData";

const PrivatePolicyInsert = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      console.log("Validation failed: Title and description are required");
      return;
    }

    // Trigger success popup
    setSuccess(true);

    // Reset form
    setTitle("");
    setDescription("");
  };

  const handleCancel = () => {
    navigate("/private-policy");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Private Policy
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Field */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter policy title"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter policy description"
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

export default PrivatePolicyInsert;
