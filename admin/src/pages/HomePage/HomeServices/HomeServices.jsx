import React, { useEffect, useState } from "react";
import Submit from "../../../components/Buttons/Submit";
import Update from "./../../../components/Buttons/Update";
import SubmitData from "../../../components/Popup/SubmitData";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";
import { AiOutlineClose } from "react-icons/ai";

const HomeServices = () => {
  const [form, setForm] = useState({ heading: "", description: "" });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    axios.get(`${BE_URL}/homeServices`).then((res) => {
      if (res.data?.data) {
        const { heading, description, images } = res.data.data;
        setForm({ heading, description });
        setIsUpdate(true);
        const parsedImages = Array.isArray(images)
          ? images
          : JSON.parse(images || "[]");
        setExistingImages(parsedImages);
      }
    });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(
      0,
      5 - existingImages.length
    );
    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const removeNewImage = (index) => {
    const updatedImages = [...images];
    const updatedPreview = [...preview];
    updatedImages.splice(index, 1);
    updatedPreview.splice(index, 1);
    setImages(updatedImages);
    setPreview(updatedPreview);
  };

  const removeExistingImage = (filename) => {
    setExistingImages(existingImages.filter((img) => img !== filename));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("heading", form.heading);
    data.append("description", form.description);
    images.forEach((img) => data.append("images", img));
    data.append("existingImages", JSON.stringify(existingImages));

    try {
      const res = await axios.post(`${BE_URL}/homeServices`, data);

      if (
        res.data?.data?.status === "success" ||
        res.data?.status === "success"
      ) {
        setSuccess(true);
        setIsUpdate(true);
        setImages([]);
        setPreview([]);

        // Refetch updated data
        const updated = await axios.get(`${BE_URL}/homeServices`);
        if (updated.data?.data) {
          const { heading, description, images } = updated.data.data;
          setForm({ heading, description });

          const parsedImages =
            typeof images === "string" ? JSON.parse(images) : images;
          setExistingImages(parsedImages);
        }
      } else {
        alert("Unexpected response from server.");
      }
    } catch (err) {
      alert("Error saving data.");
      console.error("Submission error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Home Services
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Heading
            </label>
            <input
              type="text"
              name="heading"
              value={form.heading}
              onChange={handleChange}
              className="border border-blue-500 rounded-md p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              value={form.description}
              onChange={handleChange}
              className="border border-blue-500 rounded-md p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Upload Images (Max 5)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="mb-2"
              disabled={existingImages.length + images.length >= 5}
            />
            <div className="flex flex-wrap gap-4">
              {/* Existing Images */}
              {existingImages.map((img, index) => (
                <div key={index} className="relative group w-24 h-24">
                  <img
                    src={`${BE_URL}/Images/HomeImages/HomeServices/${img}`}
                    alt="existing"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img)}
                    className="absolute top-0 right-0 bg-white p-1 rounded-full shadow hover:bg-red-100"
                  >
                    <AiOutlineClose className="text-red-600" size={16} />
                  </button>
                </div>
              ))}

              {/* New Image Previews */}
              {preview.map((src, index) => (
                <div key={index} className="relative group w-24 h-24">
                  <img
                    src={src}
                    alt="preview"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-0 right-0 bg-white p-1 rounded-full shadow hover:bg-red-100"
                  >
                    <AiOutlineClose className="text-red-600" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            {isUpdate ? <Update type="submit" /> : <Submit type="submit" />}
          </div>
        </form>
      </div>

      {success && (isUpdate ? <UpdateData /> : <SubmitData />)}
    </div>
  );
};

export default HomeServices;
