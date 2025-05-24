import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";

const HomeBlogsInsert = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [dataBlocks, setDataBlocks] = useState([{ data_h: "", data_p: "" }]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleImageChange = (e) => {
    setErrorMsg("");
    setImage(e.target.files[0]);
  };

  const handleAddBlock = () => {
    setDataBlocks([...dataBlocks, { data_h: "", data_p: "" }]);
  };

  const handleBlockChange = (index, field, value) => {
    const updated = [...dataBlocks];
    updated[index][field] = value;
    setDataBlocks(updated);
  };

  const handleRemoveBlock = (index) => {
    if (dataBlocks.length > 1) {
      const updated = [...dataBlocks];
      updated.splice(index, 1);
      setDataBlocks(updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (
      !title ||
      !image ||
      dataBlocks.length === 0 ||
      dataBlocks.some((b) => !b.data_h || !b.data_p)
    ) {
      setErrorMsg(
        "Please fill out all fields, including at least one data block."
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("data", JSON.stringify(dataBlocks));

    try {
      setLoading(true);
      const response = await axios.post(`${BE_URL}/homeBlog`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status === "success") {
        setSuccess(true);
        setTitle("");
        setImage(null);
        setDataBlocks([{ data_h: "", data_p: "" }]);

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";

        setTimeout(() => setSuccess(false), 2500);
      } else {
        setErrorMsg("Failed to insert data. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMsg(
        error.response?.data?.error || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/home-blogs");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Home Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Title */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Select One Blog Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
              required
            />
          </div>

          {/* JSON Data blocks */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Blog Content (Heading & Paragraph)
            </label>
            {dataBlocks.map((block, index) => (
              <div
                key={index}
                className="border border-blue-200 p-4 rounded-md mb-4 relative"
              >
                {dataBlocks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveBlock(index)}
                    className="absolute -top-3 cursor-pointer -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-sm"
                    title="Remove Block"
                  >
                    <AiOutlineClose size={18} />
                  </button>
                )}
                <input
                  type="text"
                  placeholder="Data Heading"
                  value={block.data_h}
                  onChange={(e) =>
                    handleBlockChange(index, "data_h", e.target.value)
                  }
                  className="border border-blue-300 rounded-md p-2 mb-2 w-full"
                  required
                />
                <textarea
                  placeholder="Data Paragraph"
                  value={block.data_p}
                  onChange={(e) =>
                    handleBlockChange(index, "data_p", e.target.value)
                  }
                  className="border border-blue-300 rounded-md p-2 w-full"
                  rows={3}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddBlock}
              className="flex items-center gap-2 text-blue-700 cursor-pointer hover:text-white hover:bg-blue-700 border border-blue-700 px-2 py-2 rounded-md transition-colors duration-600 mt-2"
            >
              <AiOutlinePlus size={18} />
              Add More
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Submit type="submit" disabled={loading} />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {success && <SubmitData />}
    </div>
  );
};

export default HomeBlogsInsert;
