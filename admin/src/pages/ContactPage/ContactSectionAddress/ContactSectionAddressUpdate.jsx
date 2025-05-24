// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Update from "../../../components/Buttons/Update";
// import Cancel from "../../../components/Buttons/Cancel";
// import UpdateData from "../../../components/Popup/UpdateData";

// const ContactSectionAddressUpdate = () => {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [address, setAddress] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!title.trim() || !address.trim()) {
//       console.log("Validation failed: Fields are required");
//       return;
//     }

//     // Show success popup
//     setSuccess(true);

//     // Reset form
//     setTitle("");
//     setAddress("");
//   };

//   const handleCancel = () => {
//     navigate("/contact-section-address");
//   };

//   return (
//     <div className="p-6">
//       <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
//         <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
//           Update Contact Section Address
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Title Input */}
//           <div>
//             <label className="block mb-2 text-blue-700 font-semibold">
//               Title
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="border border-blue-500 rounded-md p-2 w-full"
//               placeholder="Enter title"
//               required
//             />
//           </div>

//           {/* Address Input */}
//           <div>
//             <label className="block mb-2 text-blue-700 font-semibold">
//               Address
//             </label>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="border border-blue-500 rounded-md p-2 w-full"
//               placeholder="Enter address"
//               required
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-4">
//             <Update type="submit" />
//             <Cancel onClick={handleCancel} />
//           </div>
//         </form>
//       </div>

//       {/* Success Popup */}
//       {success && <UpdateData />}
//     </div>
//   );
// };

// export default ContactSectionAddressUpdate;

/** */

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const ContactSectionAddressUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract passed row data from location.state
  const rowData = location.state?.rowData;

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);

  // Prefill form on mount or when rowData changes
  useEffect(() => {
    if (rowData) {
      setTitle(rowData.title);
      setAddress(rowData.address);
    }
  }, [rowData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !address.trim()) {
      alert("Both fields are required");
      return;
    }

    try {
      // Send update request to backend
      await axios.put(
        `${BE_URL}/contact-section-address/update/${rowData.id}`,
        {
          title,
          address,
        }
      );

      setSuccess(true);

      // Optionally, navigate back after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        navigate("/contact-section-address");
      }, 2000);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update. See console for details.");
    }
  };

  const handleCancel = () => {
    navigate("/contact-section-address");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Contact Section Address
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Input */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter title"
              required
            />
          </div>

          {/* Address Input */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter address"
              required
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

export default ContactSectionAddressUpdate;
