import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import { FaPlus, FaTimes } from "react-icons/fa";
import Update from "../../../components/Buttons/Update";
import Cancel from "./../../../components/Buttons/Cancel";
import UpdateData from "./../../../components/Popup/UpdateData";

const PackageDataDetailsUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { packageStateData } = location.state || {};

  const [formData, setFormData] = useState({
    id: "",
    package_id: "",
    data_title: "",
    single_image: "",
    night: "",
    day: "",
    data_description: "",
    multiple_images: [],
    inclusions: [],
    from_city_id: "",
    to_city_id: "",
    state_id: "",
    attraction: [],
    faqs: [],
    highlight: "",
  });

  const [packageNames, setPackageNames] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateNames, setStateNames] = useState([]);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get(`${BE_URL}/packageName`)
      .then((res) => setPackageNames(res.data.data));
    axios
      .get(`${BE_URL}/packageAreaName`)
      .then((res) => setCities(res.data.data));
    axios
      .get(`${BE_URL}/packageStateName`)
      .then((res) => setStateNames((prev) => [...prev, ...res.data.data]));
  }, []);

  useEffect(() => {
    if (packageStateData) {
      setFormData({
        ...packageStateData,
        multiple_images: packageStateData.multiple_images || [],
        inclusions: packageStateData.inclusions || [],
        attraction: packageStateData.attraction || [],
        faqs: packageStateData.faqs || [],
        highlight: packageStateData.highlight || "",
      });
    }
  }, [packageStateData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleListChange = (field, value, index) => {
    const updated = [...formData[field]];
    updated[index] = value;
    handleChange(field, updated);
  };

  const handleAddItem = (field) => {
    if (field === "faqs") {
      handleChange("faqs", [...formData.faqs, newFaq]);
      setNewFaq({ question: "", answer: "" });
    } else {
      handleChange(field, [...formData[field], ""]);
    }
  };

  const handleRemoveItem = (field, index) => {
    const updated = formData[field].filter((_, i) => i !== index);
    handleChange(field, updated);
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();

      form.append("package_name_id", formData.package_id);
      form.append("data_title", formData.data_title);
      form.append("night", formData.night);
      form.append("day", formData.day);
      form.append("data_description", formData.data_description);
      form.append("highlight", formData.highlight);
      form.append("from_city_id", formData.from_city_id);
      form.append("to_city_id", formData.to_city_id);
      form.append("state_id", formData.state_id);
      form.append(
        "existing_single_image",
        typeof formData.single_image === "string" ? formData.single_image : ""
      );

      if (typeof formData.single_image !== "string") {
        form.append("single_image", formData.single_image);
      }

      form.append(
        "existing_multiple_images",
        JSON.stringify(
          formData.multiple_images.filter((img) => typeof img === "string")
        )
      );

      formData.multiple_images.forEach((img) => {
        if (typeof img !== "string") {
          form.append("multiple_images", img);
        }
      });

      form.append("inclusions", JSON.stringify(formData.inclusions));
      form.append("attraction", JSON.stringify(formData.attraction));
      form.append("faqs", JSON.stringify(formData.faqs));

      await axios.put(`${BE_URL}/packageDataDetails/${formData.id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // alert("Package data updated successfully");
      // navigate("/package-data-details");
      setShowPopup(true);
    } catch (err) {
      console.error(err);
      alert("Failed to update package data");
    }
  };

  const handleCancel = () => {
    navigate("/package-data-details");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-6xl mx-auto mt-8 space-y-6">
      {showPopup && <UpdateData onClose={() => setShowPopup(false)} />}
      <h2 className="text-2xl font-bold text-gray-800">
        Edit Package Data Detail
      </h2>

      {/* Package Selector */}
      <div>
        <label className="font-semibold">Package Name</label>
        <select
          className="w-full mt-1 p-2 border rounded"
          value={formData.package_id?.toString() || ""}
          onChange={(e) => handleChange("package_id", e.target.value)}
        >
          <option value="">Select Package</option>
          {packageNames.map((pkg) => (
            <option key={pkg.id} value={pkg.id.toString()}>
              {pkg.package_name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold">Title</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="text"
            value={formData.data_title}
            onChange={(e) => handleChange("data_title", e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full mt-1 p-2 border rounded"
            rows="3"
            value={formData.data_description}
            onChange={(e) => handleChange("data_description", e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Nights</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="number"
            value={formData.night}
            onChange={(e) => handleChange("night", e.target.value)}
          />
        </div>
        <div>
          <label className="font-semibold">Days</label>
          <input
            className="w-full mt-1 p-2 border rounded"
            type="number"
            value={formData.day}
            onChange={(e) => handleChange("day", e.target.value)}
          />
        </div>

        {/* From and To City Selectors */}
        <div>
          <label className="font-semibold">From City</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={formData.from_city_id}
            onChange={(e) => handleChange("from_city_id", e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.package_area_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">To City</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={formData.to_city_id}
            onChange={(e) => handleChange("to_city_id", e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.package_area_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="font-semibold">State Name</label>
        <select
          className="w-full mt-1 p-2 border rounded"
          value={formData.state_id}
          onChange={(e) => handleChange("state_id", e.target.value)}
        >
          <option value="">Select State Name</option>
          {stateNames.map((city) => (
            <option key={city.id} value={city.id}>
              {city.package_state_name}
            </option>
          ))}
        </select>
      </div>

      {/* Repeated Fields */}
      {["inclusions", "attraction"].map((field) => (
        <div key={field}>
          <label className="font-semibold capitalize">{field}</label>
          {formData[field].map((item, i) => (
            <div key={i} className="flex items-center space-x-2 mt-1">
              <input
                className="w-full p-2 border rounded"
                value={item}
                onChange={(e) => handleListChange(field, e.target.value, i)}
              />
              <FaTimes
                className="text-red-600 cursor-pointer"
                onClick={() => handleRemoveItem(field, i)}
              />
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 flex items-center mt-2"
            onClick={() => handleAddItem(field)}
          >
            <FaPlus className="mr-1" /> Add {field.slice(0, -1)}
          </button>
        </div>
      ))}

      {/* FAQs */}
      <div>
        <label className="font-semibold">FAQs</label>
        {formData.faqs.map((faq, i) => (
          <div key={i} className="border p-2 rounded mt-2 space-y-1">
            <input
              className="w-full p-2 border rounded"
              placeholder="Question"
              value={faq.question}
              onChange={(e) => {
                const updated = [...formData.faqs];
                updated[i].question = e.target.value;
                handleChange("faqs", updated);
              }}
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Answer"
              value={faq.answer}
              onChange={(e) => {
                const updated = [...formData.faqs];
                updated[i].answer = e.target.value;
                handleChange("faqs", updated);
              }}
            />
            <FaTimes
              className="text-red-600 cursor-pointer mt-1"
              onClick={() => handleRemoveItem("faqs", i)}
            />
          </div>
        ))}

        <div className="flex gap-2 mt-2">
          <input
            className="w-full p-2 border rounded"
            placeholder="New Question"
            value={newFaq.question}
            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="New Answer"
            value={newFaq.answer}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          />
        </div>
        <button
          type="button"
          className="text-blue-600 flex items-center mt-2"
          onClick={() => handleAddItem("faqs")}
        >
          <FaPlus className="mr-1" /> Add FAQ
        </button>
      </div>

      <div>
        <label className="font-semibold">Highlight</label>
        <input
          className="w-full mt-1 p-2 border rounded"
          type="text"
          value={formData.highlight}
          onChange={(e) => handleChange("highlight", e.target.value)}
        />
      </div>

      {/* Single Image */}
      <div>
        <label className="font-semibold">Single Image</label>
        <input
          type="file"
          accept="image/*"
          className="block mt-1"
          onChange={(e) => {
            if (e.target.files[0]) {
              handleChange("single_image", e.target.files[0]);
            }
          }}
        />
        <div className="relative w-32 h-32 mt-2">
          {formData.single_image ? (
            <div className="relative w-full h-full">
              <img
                src={
                  typeof formData.single_image === "string"
                    ? `${BE_URL}/Images/PackageImages/PackageDataDetails/${formData.single_image}`
                    : URL.createObjectURL(formData.single_image)
                }
                alt="Single"
                className="w-full h-full object-cover rounded border shadow"
              />
              <FaTimes
                className="absolute top-1 right-1 bg-white rounded-full text-red-600 cursor-pointer"
                onClick={() => handleChange("single_image", "")}
              />
            </div>
          ) : (
            <p className="text-gray-500">No image</p>
          )}
        </div>
      </div>

      {/* Multiple Images */}
      <div>
        <label className="font-semibold">Multiple Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          className="block mt-1"
          onChange={(e) => {
            const files = Array.from(e.target.files);
            handleChange("multiple_images", [
              ...formData.multiple_images,
              ...files,
            ]);
          }}
        />
        <div className="flex flex-wrap gap-3 mt-2">
          {formData.multiple_images.map((img, index) => (
            <div key={index} className="relative w-20 h-20">
              <img
                src={
                  typeof img === "string"
                    ? `${BE_URL}/Images/PackageImages/PackageDataDetails/${img}`
                    : URL.createObjectURL(img)
                }
                className="w-full h-full object-cover rounded border shadow"
                alt={`Multiple ${index}`}
              />
              <FaTimes
                className="absolute top-0.5 right-0.5 bg-white rounded-full text-red-600 cursor-pointer"
                onClick={() => handleRemoveItem("multiple_images", index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Update Button */}
      <div className="flex justify-end gap-4">
        {/* <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Package
        </button> */}
        <Update onClick={handleUpdate} />
        <Cancel onClick={handleCancel} />
      </div>
    </div>
  );
};

export default PackageDataDetailsUpdate;
