import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";

const AboutImagesSectionInsert = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      console.log("Validation failed: No images selected");
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    setLoading(true);

    try {
      const response = await axios.post(
        `${BE_URL}/aboutImageSection`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        // Show success popup
        setSuccess(true);

        // Reset form and state
        setImages([]);
        document.querySelector('input[type="file"]').value = "";

        // Hide popup after 2.5 seconds
        setTimeout(() => setSuccess(false), 2500);
      } else {
        console.error("Unexpected response", response);
      }
    } catch (error) {
      console.error("Insert failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/about-images-section");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add About Images Section
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Select Multiple Images
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Submit type="submit" disabled={loading} />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {success && <SubmitData />}
    </div>
  );
};

export default AboutImagesSectionInsert;
