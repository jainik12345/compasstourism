import React, { useState } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";

const BlueTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1976d2",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#1976d2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#1976d2",
    },
    "&:hover fieldset": {
      borderColor: "#1565c0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
});

const AboutHeroSectionInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    image: null,
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0] || null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description || !formData.image) {
      console.log("Validation failed");
      return;
    }

    // Success logic (no API call)
    setSuccess(true);

    setFormData({
      description: "",
      image: null,
    });

    document.querySelector('input[type="file"]').value = "";
  };

  const handleCancel = () => {
    navigate("/about-hero-section");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add About Hero Section
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Description Input */}
          <div>
            <BlueTextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              required
            />
          </div>

          {/* Single Image Upload */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Upload Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
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

export default AboutHeroSectionInsert;
