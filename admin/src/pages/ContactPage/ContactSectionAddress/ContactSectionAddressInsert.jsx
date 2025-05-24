import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitData from "../../../components/Popup/SubmitData";
import axios from "axios";
import BE_URL from "../../../config";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";

const ContactSectionAddressInsert = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !address.trim()) {
      alert("Both fields are required.");
      return;
    }

    try {
      await axios.post(`${BE_URL}/contact-section-address/insert`, {
        title,
        address,
      });

      setSuccess(true);
      setTitle("");
      setAddress("");

      // Auto-close popup after 2.5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 2500);
    } catch (err) {
      console.error("Insert error:", err);
      alert("Insert failed. Check console for details.");
    }
  };

  const handleCancel = () => {
    navigate("/contact-section-address");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Contact Section Address
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Input */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter title"
              required
            />
          </div>

          {/* Address Input */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter address"
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

export default ContactSectionAddressInsert;
