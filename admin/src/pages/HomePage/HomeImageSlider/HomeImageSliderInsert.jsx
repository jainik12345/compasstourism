import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";

const HomeImageSliderInsert = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      console.log("Validation failed: No images selected");
      return;
    }

    // Trigger success popup
    setSuccess(true);

    // Reset form
    setImages([]);
    document.querySelector('input[type="file"]').value = "";
  };

  const handleCancel = () => {
    navigate("/home-image-slider");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Home Image Slider
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Multiple Image Upload */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Select Multiple Slider Images
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

export default HomeImageSliderInsert;
