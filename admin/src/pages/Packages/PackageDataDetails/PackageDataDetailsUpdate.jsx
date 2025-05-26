// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const PackageDataDetailsUpdate = () => {
//   const location = useLocation();
//   const { packageStateData } = location.state || {};

//   const [formData, setFormData] = useState({
//     id: "",
//     data_title: "",
//     single_image: "",
//     night: "",
//     day: "",
//     data_description: "",
//     multiple_images: [],
//     inclusions: [],
//     from_city_id: "",
//     to_city_id: "",
//     attraction: [],
//     faqs: [],
//     highlight: [],
//   });

//   useEffect(() => {
//     if (packageStateData) {
//       setFormData({
//         id: packageStateData.id,
//         data_title: packageStateData.data_title,
//         single_image: packageStateData.single_image,
//         night: packageStateData.night,
//         day: packageStateData.day,
//         data_description: packageStateData.data_description,
//         multiple_images: packageStateData.multiple_images || [],
//         inclusions: packageStateData.inclusions || [],
//         from_city_id: packageStateData.from_city_id,
//         to_city_id: packageStateData.to_city_id,
//         attraction: packageStateData.attraction || [],
//         faqs: packageStateData.faqs || [],
//         highlight: packageStateData.highlight || [],
//       });
//     }
//   }, [packageStateData]);

//   return (
//     <div>
//       <h2 className="text-center text-3xl font-semibold" >Edit Package Data Detail</h2>
//       <pre>{JSON.stringify(formData, null, 2)}</pre>
//     </div>
//   );
// };

// export default PackageDataDetailsUpdate;

/** Selector in Not Fetch Data : */

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import BE_URL from "../../../config";

// const PackageDataDetailsUpdate = () => {
//   const location = useLocation();
//   const { packageStateData } = location.state || {};

//   const [formData, setFormData] = useState({
//     id: "",
//     data_title: "",
//     single_image: "",
//     night: "",
//     day: "",
//     data_description: "",
//     multiple_images: [],
//     inclusions: [],
//     from_city_id: "",
//     to_city_id: "",
//     attraction: [],
//     faqs: [],
//     highlight: [],
//   });

//   useEffect(() => {
//     if (packageStateData) {
//       setFormData({
//         id: packageStateData.id,
//         data_title: packageStateData.data_title,
//         single_image: packageStateData.single_image,
//         night: packageStateData.night,
//         day: packageStateData.day,
//         data_description: packageStateData.data_description,
//         multiple_images: packageStateData.multiple_images || [],
//         inclusions: packageStateData.inclusions || [],
//         from_city_id: packageStateData.from_city_id,
//         to_city_id: packageStateData.to_city_id,
//         attraction: packageStateData.attraction || [],
//         faqs: packageStateData.faqs || [],
//         highlight: packageStateData.highlight || [],
//       });
//     }
//   }, [packageStateData]);

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg max-w-5xl mx-auto mt-8 space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">
//         Edit Package Data Detail
//       </h2>

//       {/* Basic Info */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="font-semibold">Title</label>
//           <input
//             className="w-full mt-1 p-2 border rounded"
//             type="text"
//             value={formData.data_title}
//             readOnly
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Description</label>
//           <textarea
//             className="w-full mt-1 p-2 border rounded"
//             rows="3"
//             value={formData.data_description}
//             readOnly
//           />
//         </div>
//         <div>
//           <label className="font-semibold">Nights</label>
//           <input
//             className="w-full mt-1 p-2 border rounded"
//             type="number"
//             value={formData.night}
//             readOnly
//           />
//         </div>
//         <div>
//           <label className="font-semibold">Days</label>
//           <input
//             className="w-full mt-1 p-2 border rounded"
//             type="number"
//             value={formData.day}
//             readOnly
//           />
//         </div>
//         <div>
//           <label className="font-semibold">From City ID</label>
//           <input
//             className="w-full mt-1 p-2 border rounded"
//             value={formData.from_city_id}
//             readOnly
//           />
//         </div>
//         <div>
//           <label className="font-semibold">To City ID</label>
//           <input
//             className="w-full mt-1 p-2 border rounded"
//             value={formData.to_city_id}
//             readOnly
//           />
//         </div>
//       </div>

//       {/* Single Image */}
//       <div>
//         <label className="font-semibold">Single Image</label>
//         <div className="mt-2">
//           {formData.single_image ? (
//             <img
//               src={`${BE_URL}/Images/PackageImages/PackageDataDetails/${formData.single_image}`}
//               alt="Single"
//               className="w-32 h-32 object-cover rounded border shadow"
//             />
//           ) : (
//             <p className="text-gray-500">No image</p>
//           )}
//         </div>
//       </div>

//       {/* Multiple Images */}
//       <div>
//         <label className="font-semibold">Multiple Images</label>
//         <div className="flex flex-wrap gap-3 mt-2">
//           {formData.multiple_images.map((img, index) => (
//             <img
//               key={index}
//               src={`${BE_URL}/Images/PackageImages/PackageDataDetails/${img}`}
//               className="w-20 h-20 object-cover rounded border shadow"
//               alt={`Multiple ${index}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Inclusions */}
//       <div>
//         <label className="font-semibold">Inclusions</label>
//         <ul className="list-disc pl-6 mt-2 space-y-1 max-h-32 overflow-y-auto border p-3 rounded">
//           {formData.inclusions.map((inc, i) => (
//             <li key={i}>{inc}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Attractions */}
//       <div>
//         <label className="font-semibold">Attractions</label>
//         <ul className="list-disc pl-6 mt-2 space-y-1 max-h-32 overflow-y-auto border p-3 rounded">
//           {formData.attraction.map((att, i) => (
//             <li key={i}>{att}</li>
//           ))}
//         </ul>
//       </div>

//       {/* FAQs */}
//       <div>
//         <label className="font-semibold">FAQs</label>
//         <div className="mt-2 space-y-3 max-h-64 overflow-y-auto border p-4 rounded">
//           {formData.faqs.map((faq, i) => (
//             <div key={i} className="bg-gray-50 p-2 rounded shadow-sm">
//               <p>
//                 <strong>Q:</strong> {faq.question}
//               </p>
//               <p>
//                 <strong>A:</strong> {faq.answer}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Highlight */}
//       <div>
//         <label className="font-semibold">Highlight</label>
//         <input
//           className="w-full mt-1 p-2 border rounded"
//           type="text"
//           value={formData.highlight}
//           readOnly
//         />
//       </div>

//       {/* Submit Button (for future implementation) */}
//       {/* <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//         Update Package
//       </button> */}
//     </div>
//   );
// };

// export default PackageDataDetailsUpdate;

/** */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import { FaPlus, FaTimes } from "react-icons/fa";

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
    attraction: [],
    faqs: [],
    highlight: "",
  });

  const [packageNames, setPackageNames] = useState([]);
  const [cities, setCities] = useState([]);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  useEffect(() => {
    axios
      .get(`${BE_URL}/packageName`)
      .then((res) => setPackageNames(res.data.data));
    axios
      .get(`${BE_URL}/packageAreaName`)
      .then((res) => setCities(res.data.data));
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

      alert("Package data updated successfully");
      navigate("/package-data-details");
    } catch (err) {
      console.error(err);
      alert("Failed to update package data");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-5xl mx-auto mt-8 space-y-6">
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
      {/* <div>
        <label className="font-semibold">Single Image</label>
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
      </div> */}

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
      {/* <div>
        <label className="font-semibold">Multiple Images</label>
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
      </div> */}

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
      <div className="text-right">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Package
        </button>
      </div>
    </div>
  );
};

export default PackageDataDetailsUpdate;
