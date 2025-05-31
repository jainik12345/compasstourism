import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";
import { FaPlus, FaTrash } from "react-icons/fa";

const HotelsRoomsCategoryNameDetailsInsert = () => {
  const navigate = useNavigate();
  const [roomCategoryList, setRoomCategoryList] = useState([]);
  const [roomCategoryId, setRoomCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [numberOfBed, setNumberOfBed] = useState("");
  const [numberOfSqFt, setNumberOfSqFt] = useState("");
  const [view, setView] = useState("");
  const [amenities, setAmenities] = useState([{ value: "" }]); // at least one
  const [price, setPrice] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch room category name list
  useEffect(() => {
    const fetchRoomCategories = async () => {
      try {
        const response = await axios.get(`${BE_URL}/hotelRoomCategoryName`);
        setRoomCategoryList(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch room category names:", error);
      }
    };
    fetchRoomCategories();
  }, []);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleAmenityChange = (idx, value) => {
    const newAmenities = [...amenities];
    newAmenities[idx].value = value;
    setAmenities(newAmenities);
  };

  const addAmenity = () => {
    setAmenities([...amenities, { value: "" }]);
  };

  const removeAmenity = (idx) => {
    if (amenities.length === 1) return; // At least one
    setAmenities(amenities.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !roomCategoryId ||
      !title.trim() ||
      amenities.some((a) => !a.value.trim())
    ) {
      setErrorMsg("Room Category, Title, and all Amenities are required.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    const formData = new FormData();
    formData.append("room_category_name_id", roomCategoryId);
    formData.append("title", title);
    images.forEach((img) => formData.append("images", img));
    formData.append("number_of_bed", numberOfBed);
    formData.append("number_of_sq_ft", numberOfSqFt);
    formData.append("view", view);
    formData.append("amenities", JSON.stringify(amenities.map((a) => a.value)));
    formData.append("price", price);

    try {
      const response = await axios.post(
        `${BE_URL}/hotelRoomCategoryNameDetails`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.status === "success") {
        setSuccess(true);
        setRoomCategoryId("");
        setTitle("");
        setImages([]);
        setNumberOfBed("");
        setNumberOfSqFt("");
        setView("");
        setAmenities([{ value: "" }]);
        setPrice("");
        setTimeout(() => setSuccess(false), 2500);
      } else {
        setErrorMsg("Failed to insert data. Please try again.");
      }
    } catch (error) {
      console.error("Insert error:", error);
      setErrorMsg(
        error.response?.data?.error || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/hotels-room-category-name-details");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Room Category Name Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Room Category Selector */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Select Room Category Name
            </label>
            <select
              value={roomCategoryId}
              onChange={(e) => setRoomCategoryId(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              required
            >
              <option value="">-- Select Room Category --</option>
              {Array.isArray(roomCategoryList) &&
                roomCategoryList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.room_category_name}
                  </option>
                ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter title..."
              required
            />
          </div>

          {/* Images */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Images (Multiple)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="border border-blue-500 rounded-md p-2 w-full"
            />
            {images.length > 0 && (
              <div className="flex flex-wrap mt-2 gap-2">
                {Array.from(images).map((file, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 px-3 py-1 rounded text-xs text-blue-600"
                  >
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Number Of Bed */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Number Of Bed
            </label>
            <input
              type="number"
              min={1}
              value={numberOfBed}
              onChange={(e) => setNumberOfBed(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter number of beds..."
            />
          </div>

          {/* Number of Sq Ft */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Number of Sq Ft
            </label>
            <input
              type="number"
              min={1}
              value={numberOfSqFt}
              onChange={(e) => setNumberOfSqFt(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter number of sq ft..."
            />
          </div>

          {/* View */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              View
            </label>
            <input
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter view..."
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold flex items-center">
              Amenities
              <button
                type="button"
                onClick={addAmenity}
                className="ml-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-700 flex items-center"
                title="Add Amenity"
              >
                <FaPlus size={14} />
              </button>
            </label>
            <div className="space-y-2">
              {amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    value={amenity.value}
                    onChange={(e) => handleAmenityChange(idx, e.target.value)}
                    className="border border-blue-500 rounded-md p-2 w-full"
                    placeholder={`Amenity ${idx + 1}`}
                    required
                  />
                  {amenities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAmenity(idx)}
                      className="p-2 text-red-600 hover:text-red-800"
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Price
            </label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter price..."
            />
          </div>

          {errorMsg && <p className="mt-1 text-sm text-red-600">{errorMsg}</p>}

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

export default HotelsRoomsCategoryNameDetailsInsert;
