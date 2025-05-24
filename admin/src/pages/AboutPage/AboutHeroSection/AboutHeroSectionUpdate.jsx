import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const BlueTextField = styled(TextField)({
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const AboutHeroSectionUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get the row data passed via navigation state
  const rowData = location.state?.rowData;

  const [formData, setFormData] = useState({
    description: "",
    imageFile: null, // The new selected file (if any)
    imagePreview: "", // URL for preview (either existing or selected)
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Populate form on mount with existing data
    if (rowData) {
      setFormData({
        description: rowData.description || "",
        imageFile: null,
        imagePreview: rowData.image || "", // the URL from backend
      });
    }
  }, [rowData]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        // create a preview URL from the selected file
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      // if no file selected, reset file and preview
      setFormData((prev) => ({
        ...prev,
        imageFile: null,
        imagePreview: rowData?.image || "",
      }));
    }
  };

  const getFilenameFromURL = (url) => {
    if (!url) return "";
    return url.substring(url.lastIndexOf("/") + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description) {
      console.log("Description is required");
      return;
    }

    const updateData = new FormData();
    updateData.append("description", formData.description);

    if (formData.imageFile) {
      // User selected a new image file
      updateData.append("image", formData.imageFile);
    } else {
      // No new image file — send existing image filename only (not full URL)
      updateData.append(
        "existingImage",
        getFilenameFromURL(formData.imagePreview)
      );
    }

    try {
      await axios.put(`${BE_URL}/aboutHeroSection/${rowData.id}`, updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/about-hero-section");
      }, 2500);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    navigate("/about-hero-section");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update About Hero Section
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          encType="multipart/form-data"
        >
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

          {/* Image Preview */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Current Image
            </label>
            {formData.imagePreview ? (
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="w-30 h-30 object-cover rounded mb-4 border border-gray-300"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* Single Image Upload */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Upload New Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {success && <UpdateData />}
    </div>
  );
};

export default AboutHeroSectionUpdate;
