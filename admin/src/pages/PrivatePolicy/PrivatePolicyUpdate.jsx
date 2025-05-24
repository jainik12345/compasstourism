import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Update from "../../components/Buttons/Update";
import Cancel from "../../components/Buttons/Cancel";
import UpdateData from "../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../config";

const PrivatePolicyUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const rowData = location.state?.rowData;

  useEffect(() => {
    if (rowData) {
      setTitle(rowData.private_policy_title);
      setDescription(rowData.private_policy_description);
    }
  }, [rowData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      console.log("Validation failed: Title and description are required");
      return;
    }

    try {
      const res = await axios.put(
        `${BE_URL}/private-policy/update/${rowData.id}`,
        {
          private_policy_title: title,
          private_policy_description: description,
        }
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          navigate("/private-policy");
        }, 2500);
      }
    } catch (err) {
      console.error("Error updating policy:", err);
      alert("Failed to update policy");
    }
  };

  const handleCancel = () => {
    navigate("/private-policy");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Private Policy
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter policy title"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter policy description"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {success && <UpdateData />}
    </div>
  );
};

export default PrivatePolicyUpdate;
