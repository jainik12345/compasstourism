import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FaPlus, FaTimes } from "react-icons/fa";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";

const HotelsRulesUpdate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const rowData = state?.rowData;

  const [hotelList, setHotelList] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState("");
  const [floors, setFloors] = useState("");
  const [rules, setRules] = useState([
    { heading: "", titles: [{ value: "" }] },
  ]);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const id = rowData?.id;

  useEffect(() => {
    fetchHotels();
    if (rowData) {
      setSelectedHotelId(rowData.hotel_id || "");
      setCheckIn(rowData.check_in || "");
      setCheckOut(rowData.check_out || "");
      setRooms(rowData.rooms || "");
      setFloors(rowData.floors || "");
      // Parse rules as JSON array
      let parsedRules = [];
      if (Array.isArray(rowData.rules)) {
        parsedRules = rowData.rules;
      } else if (typeof rowData.rules === "string") {
        try {
          parsedRules = JSON.parse(rowData.rules);
        } catch {
          parsedRules = [];
        }
      }
      if (!parsedRules || parsedRules.length === 0)
        parsedRules = [{ heading: "", titles: [{ value: "" }] }];
      setRules(
        parsedRules.map((r) => ({
          heading: r.heading || "",
          titles: Array.isArray(r.titles)
            ? r.titles.map((t) =>
                typeof t === "string" ? { value: t } : { value: t.value || "" }
              )
            : [{ value: "" }],
        }))
      );
    }
    // eslint-disable-next-line
  }, [rowData]);

  const fetchHotels = async () => {
    try {
      const res = await axios.get(`${BE_URL}/hotelName`);
      setHotelList(res.data.data);
    } catch (err) {
      console.error("Failed to fetch hotels", err);
    }
  };

  // Rule handlers
  const handleRuleChange = (idx, field, value) => {
    setRules((prev) =>
      prev.map((rule, i) => (i === idx ? { ...rule, [field]: value } : rule))
    );
  };

  const handleAddRule = () => {
    setRules((prev) => [...prev, { heading: "", titles: [{ value: "" }] }]);
  };

  const handleRemoveRule = (idx) => {
    setRules((prev) => prev.filter((_, i) => i !== idx));
  };

  // Title handlers for rules
  const handleTitleChange = (rIdx, tIdx, value) => {
    setRules((prev) =>
      prev.map((rule, i) =>
        i === rIdx
          ? {
              ...rule,
              titles: rule.titles.map((t, j) =>
                j === tIdx ? { ...t, value } : t
              ),
            }
          : rule
      )
    );
  };

  const handleAddTitle = (rIdx) => {
    setRules((prev) =>
      prev.map((rule, i) =>
        i === rIdx ? { ...rule, titles: [...rule.titles, { value: "" }] } : rule
      )
    );
  };

  const handleRemoveTitle = (rIdx, tIdx) => {
    setRules((prev) =>
      prev.map((rule, i) =>
        i === rIdx
          ? { ...rule, titles: rule.titles.filter((_, j) => j !== tIdx) }
          : rule
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHotelId) {
      setErrorMsg("Please select a hotel.");
      return;
    }
    if (!checkIn.trim()) {
      setErrorMsg("Please enter check-in.");
      return;
    }
    if (!checkOut.trim()) {
      setErrorMsg("Please enter check-out.");
      return;
    }
    if (!rooms || isNaN(rooms)) {
      setErrorMsg("Please enter valid number of rooms.");
      return;
    }
    if (!floors || isNaN(floors)) {
      setErrorMsg("Please enter valid number of floors.");
      return;
    }
    const rulesPayload = rules
      .map((r) => ({
        heading: r.heading.trim(),
        titles: r.titles.map((t) => t.value.trim()).filter((t) => t),
      }))
      .filter((r) => r.heading && r.titles.length > 0);

    if (rulesPayload.length === 0) {
      setErrorMsg("Please add at least one rule with heading and titles.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        hotel_id: selectedHotelId,
        check_in: checkIn,
        check_out: checkOut,
        rooms: parseInt(rooms, 10),
        floors: parseInt(floors, 10),
        rules: rulesPayload, // send as array of objects, backend should use JSON
      };
      await axios.put(`${BE_URL}/hotelRules/${id}`, payload);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/hotels-rules");
      }, 2500);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Hotel Rules
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <FormControl fullWidth>
            <InputLabel>Select Hotel</InputLabel>
            <Select
              value={selectedHotelId}
              label="Select Hotel"
              onChange={(e) => setSelectedHotelId(e.target.value)}
              required
            >
              {hotelList.map((hotel) => (
                <MenuItem key={hotel.id} value={hotel.id}>
                  {hotel.hotel_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Check-in */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Check-in
            </label>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter check-in time"
              required
            />
          </div>

          {/* Check-out */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Check-out
            </label>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter check-out time"
              required
            />
          </div>

          {/* Rooms */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Number of Rooms
            </label>
            <input
              type="number"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter number of rooms"
              required
              min={1}
            />
          </div>

          {/* Floors */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Number of Floors
            </label>
            <input
              type="number"
              value={floors}
              onChange={(e) => setFloors(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter number of floors"
              required
              min={1}
            />
          </div>

          {/* Rules */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold flex items-center">
              Rules
              <button
                type="button"
                onClick={handleAddRule}
                className="ml-2 p-1 rounded-full bg-blue-100 hover:bg-blue-300 text-blue-700"
                title="Add Rule"
              >
                <FaPlus />
              </button>
            </label>
            <div className="space-y-6">
              {rules.map((rule, rIdx) => (
                <div
                  key={rIdx}
                  className="border border-blue-200 rounded-lg p-4 bg-blue-50"
                >
                  <div className="flex items-center mb-3 gap-2">
                    <input
                      type="text"
                      value={rule.heading}
                      onChange={(e) =>
                        handleRuleChange(rIdx, "heading", e.target.value)
                      }
                      className="border border-blue-500 rounded-md p-2 w-full"
                      placeholder={`Rule Heading`}
                      required
                    />
                    {rules.length > 1 && (
                      <button
                        type="button"
                        className="p-2 rounded-full bg-red-100 hover:bg-red-300 text-red-700 flex items-center"
                        onClick={() => handleRemoveRule(rIdx)}
                        title="Remove Rule"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                  {/* Titles for this rule */}
                  <label className="block mb-2 text-blue-700 font-medium flex items-center">
                    Titles
                    <button
                      type="button"
                      onClick={() => handleAddTitle(rIdx)}
                      className="ml-2 p-1 rounded-full bg-blue-100 hover:bg-blue-300 text-blue-700"
                      title="Add Title"
                    >
                      <FaPlus />
                    </button>
                  </label>
                  <div className="space-y-2">
                    {rule.titles.map((t, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={t.value}
                          onChange={(e) =>
                            handleTitleChange(rIdx, tIdx, e.target.value)
                          }
                          className="border border-blue-500 rounded-md p-2 w-full"
                          placeholder={`Title ${tIdx + 1}`}
                          required
                        />
                        {rule.titles.length > 1 && (
                          <button
                            type="button"
                            className="p-2 rounded-full bg-red-100 hover:bg-red-300 text-red-700 flex items-center"
                            onClick={() => handleRemoveTitle(rIdx, tIdx)}
                            title="Remove Title"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {errorMsg && (
              <p className="mt-1 text-sm text-red-600">{errorMsg}</p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Update type="submit" disabled={loading} />
            <Cancel onClick={() => navigate("/hotels-rules")} />
          </div>
        </form>
      </div>
      {success && <UpdateData />}
    </div>
  );
};

export default HotelsRulesUpdate;
