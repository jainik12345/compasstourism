import React, {  useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const HomeTestimonialUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rowData } = location.state || {};

  const [description, setDescription] = useState(rowData?.description || "");
  const [name, setName] = useState(rowData?.name || "");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim() || !name.trim()) {
      return;
    }

    try {
      await axios.put(`${BE_URL}/homeTestimonial/update/${rowData.id}`, {
        description,
        name,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/home-testimonial");
      }, 2500);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    navigate("/home-testimonial");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Testimonial
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

export default HomeTestimonialUpdate;
