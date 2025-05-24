import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";
import { FaTimes } from "react-icons/fa";

const HomeBlogsUpdate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState([{ data_h: "", data_p: "" }]);
  const [success, setSuccess] = useState(false);

  const rowData = state?.rowData;

  useEffect(() => {
    if (rowData) {
      setTitle(rowData.title);
      setPreview(`${BE_URL}/Images/HomeImages/HomeBlog/${rowData.image}`);
      setData(rowData.data || [{ data_h: "", data_p: "" }]);
    }
  }, [rowData]);

  const handleDataChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  const addDataBlock = () => {
    setData([...data, { data_h: "", data_p: "" }]);
  };

  const removeDataBlock = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("existingImage", rowData.image);  
    }
    formData.append("data", JSON.stringify(data));

    try {
      await axios.put(`${BE_URL}/homeBlog/${rowData.id}`, formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/home-blogs");
      }, 2500);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Home Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Image</label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Content Blocks</label>
            {data.map((block, i) => (
              <div key={i} className="border rounded p-3 mb-4">
                <input
                  type="text"
                  placeholder="Heading"
                  value={block.data_h}
                  onChange={(e) =>
                    handleDataChange(i, "data_h", e.target.value)
                  }
                  className="border rounded p-2 w-full mb-2"
                />
                <textarea
                  placeholder="Paragraph"
                  value={block.data_p}
                  onChange={(e) =>
                    handleDataChange(i, "data_p", e.target.value)
                  }
                  className="border rounded p-2 w-full"
                />
                {data.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDataBlock(i)}
                    className="text-red-500 mt-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDataBlock}
              className="text-blue-600"
            >
              + Add Block
            </button>
          </div>

          <div className="flex justify-end gap-4">
            <Update type="submit" />
            <Cancel onClick={() => navigate("/home-blogs")} />
          </div>
        </form>
      </div>

      {success && <UpdateData />}
    </div>
  );
};

export default HomeBlogsUpdate;
