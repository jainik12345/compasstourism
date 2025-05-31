import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from "@mui/material";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import { FaPlus, FaTrash } from "react-icons/fa";

const HotelsRoomsCategoryNameDetailsUpdate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const rowData = state?.rowData;

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [numberOfBed, setNumberOfBed] = useState("");
  const [numberOfSqFt, setNumberOfSqFt] = useState("");
  const [view, setView] = useState("");
  const [amenities, setAmenities] = useState([{ value: "" }]);
  const [price, setPrice] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (rowData) {
      setSelectedCategoryId(rowData.room_category_name_id);
      setTitle(rowData.title || "");
      setNumberOfBed(rowData.number_of_bed || "");
      setNumberOfSqFt(rowData.number_of_sq_ft || "");
      setView(rowData.view || "");
      setPrice(rowData.price || "");
      setExistingImages(
        Array.isArray(rowData.images)
          ? rowData.images
          : typeof rowData.images === "string"
          ? JSON.parse(rowData.images)
          : []
      );
      // amenities might be an array or a stringified array
      let am = [];
      if (Array.isArray(rowData.amenities)) am = rowData.amenities;
      else if (typeof rowData.amenities === "string") {
        try {
          am = JSON.parse(rowData.amenities);
        } catch {
          am = [];
        }
      }
      setAmenities(am.length ? am.map((a) => ({ value: a })) : [{ value: "" }]);
    }
  }, [rowData]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BE_URL}/hotelRoomCategoryName`);
      setCategoryList(res.data.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleRemoveExistingImage = (idx) => {
    setExistingImages(existingImages.filter((_, i) => i !== idx));
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
      !selectedCategoryId ||
      !title.trim() ||
      amenities.some((a) => !a.value.trim())
    ) {
      setErrorMsg("Room Category, Title, and all Amenities are required.");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    const formData = new FormData();
    formData.append("room_category_name_id", selectedCategoryId);
    formData.append("title", title);
    images.forEach((img) => formData.append("images", img));
    formData.append("number_of_bed", numberOfBed);
    formData.append("number_of_sq_ft", numberOfSqFt);
    formData.append("view", view);
    formData.append("amenities", JSON.stringify(amenities.map((a) => a.value)));
    formData.append("price", price);
    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      await axios.put(
        `${BE_URL}/hotelRoomCategoryNameDetails/${rowData.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/hotels-room-category-name-details");
      }, 2500);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Update failed");
      console.error("Update failed", err);
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
          Update Room Category Name Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Room Category Selector */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Select Room Category Name
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              required
            >
              <option value="">-- Select Room Category --</option>
              {Array.isArray(categoryList) &&
                categoryList.map((cat) => (
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
          {/* Existing Images */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Existing Images
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {existingImages.map((img, idx) => (
                <span key={idx} className="relative">
                  <img
                    src={`${BE_URL}/Images/HotelImages/RoomCategoryDetailsImages/${img}`}
                    alt=""
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 4,
                      border: "1px solid #60a5fa",
                    }}
                  />
                  <IconButton
                    size="small"
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      background: "#fff",
                      zIndex: 2,
                    }}
                    onClick={() => handleRemoveExistingImage(idx)}
                  >
                    <FaTrash color="red" size={12} />
                  </IconButton>
                </span>
              ))}
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="border border-blue-500 rounded-md p-2 w-full"
            />
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
            <Update type="submit" disabled={loading} />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>
      {success && <UpdateData />}
    </div>
  );
};

export default HotelsRoomsCategoryNameDetailsUpdate;
