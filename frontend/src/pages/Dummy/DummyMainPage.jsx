import React, { useEffect, useState } from "react";
import axios from "axios";
import BE_URL from "../../config";

// Facility icons for demonstration (should match your backend's facility keys)
const facilityIconsMap = {
  Parking: "🅿️",
  WiFi: "📶",
  "Activity Centre / Room": "🏢",
  Garden: "🌳",
  "Children's play area": "🧒",
  Restaurant: "🍽️",
  "Swimming Pool": "🏊",
  "Elevator/ Lift": "🛗",
  Banquet: "🎉",
  "Room service": "🛎️",
  Housekeeping: "🧹",
};

const DummyMainPage = () => {
  // Filters & data states
  const [hotelStarLevels, setHotelStarLevels] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [checkedStars, setCheckedStars] = useState([]);
  const [checkedFacilities, setCheckedFacilities] = useState([]);

  // Fetch filters & hotel data from backend
  useEffect(() => {
    // Fetch star levels
    axios
      .get(`${BE_URL}/hotelStarLevels`)
      .then((res) => setHotelStarLevels(res.data.data || []))
      .catch(() =>
        setHotelStarLevels([
          { label: "Budgeted", count: 1 },
          { label: "5 Star", count: 1 },
          { label: "4 Star", count: 3 },
          { label: "3 Star", count: 5 },
          { label: "2 Star", count: 2 },
        ])
      );

    // Fetch facilities
    axios
      .get(`${BE_URL}/hotelFacilities`)
      .then((res) => setFacilities(res.data.data || []))
      .catch(() =>
        setFacilities([
          { label: "Parking", count: 5 },
          { label: "WiFi", count: 5 },
          { label: "Activity Centre / Room", count: 1 },
          { label: "Garden", count: 3 },
          { label: "Children's play area", count: 2 },
          { label: "Restaurant", count: 5 },
          { label: "Swimming Pool", count: 3 },
          { label: "Elevator/ Lift", count: 3 },
          { label: "Banquet", count: 2 },
          { label: "Room service", count: 5 },
          { label: "Housekeeping", count: 5 },
        ])
      );

    // Fetch hotels (list)
    axios
      .get(`${BE_URL}/hotelsList`)
      .then((res) => setHotels(res.data.data || []))
      .catch(() =>
        setHotels([
          {
            id: 1,
            image:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            name: "Nirvana Resort",
            stars: 3,
            location: "Approx 4 km from SOU parking, Statue of Unity",
            facilities: [
              "Swimming Pool",
              "Restaurant",
              "Room service",
              "Parking",
              "WiFi",
              "Garden",
              "Children's play area",
              "Elevator/ Lift",
            ],
            rating: 4.5,
            available: true,
            newPrice: "3,500",
            cta: "Enquire",
          },
          {
            id: 2,
            image:
              "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
            name: "Hotel Stature Inn",
            stars: 3,
            location:
              "Tower B, Unity Hub, Oppo. Tribal Museum, Statue of Unity",
            facilities: [
              "Swimming Pool",
              "Restaurant",
              "Parking",
              "Garden",
              "Banquet",
            ],
            rating: 4.2,
            available: true,
            newPrice: "3,500",
            cta: "View Details",
          },
          {
            id: 3,
            image:
              "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
            name: "SOU Valley Resort",
            stars: 4,
            location: "Near River, Statue of Unity",
            facilities: [
              "Swimming Pool",
              "Room service",
              "Parking",
              "Garden",
              "Elevator/ Lift",
              "Housekeeping",
            ],
            rating: 4.8,
            available: false,
            newPrice: "5,200",
            cta: "View Details",
          },
        ])
      );
  }, []);

  // Rendering
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex gap-8 max-w-7xl mx-auto">
        {/* Left filter - fixed */}
        <div className="w-72 shrink-0">
          <div className="sticky top-6">
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-gray-700 font-semibold mb-2">Filter by</h3>
              <hr className="mb-2" />
              <div className="mb-4">
                <div className="text-sm text-gray-500 font-semibold mb-1">
                  Hotel Star Level
                </div>
                {hotelStarLevels.map((item, idx) => (
                  <label
                    key={item.label}
                    className="flex items-center gap-2 mb-1 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-blue-600"
                      checked={checkedStars.includes(item.label)}
                      onChange={() => {
                        setCheckedStars((prev) =>
                          prev.includes(item.label)
                            ? prev.filter((l) => l !== item.label)
                            : [...prev, item.label]
                        );
                      }}
                    />
                    <span className="text-gray-700 text-sm">
                      {item.label}{" "}
                      <span className="text-gray-400">({item.count})</span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 font-semibold mb-1">
                  Facilities
                </div>
                {facilities.map((item, idx) => (
                  <label
                    key={item.label}
                    className="flex items-center gap-2 mb-1 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="accent-blue-600"
                      checked={checkedFacilities.includes(item.label)}
                      onChange={() => {
                        setCheckedFacilities((prev) =>
                          prev.includes(item.label)
                            ? prev.filter((l) => l !== item.label)
                            : [...prev, item.label]
                        );
                      }}
                    />
                    <span className="text-gray-700 text-sm">
                      {item.label}{" "}
                      <span className="text-gray-400">({item.count})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1">
          {/* Top: Heading */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Hotels in Statue of Unity
          </h2>
          {/* Hotel cards */}
          <div className="flex flex-col gap-5">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl shadow flex p-4 items-center gap-6"
              >
                {/* Left: hotel image */}
                <div className="w-56 h-36 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  {hotel.label && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      {hotel.label}
                    </div>
                  )}
                </div>
                {/* Right: details */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-gray-800">
                      {hotel.name}
                    </span>
                    <span>
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-base">
                          &#9733;
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm">{hotel.location}</div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {hotel.facilities.map((label, idx) => (
                      <span key={label} className="text-xl" title={label}>
                        {facilityIconsMap[label] || "❔"}
                      </span>
                    ))}
                  </div>
                </div>
                {/* CTA / Price */}
                <div className="flex flex-col items-end justify-between h-full min-w-[160px]">
                  <div className="mb-3">
                    {hotel.cta === "View Details" && (
                      <div className="text-right text-gray-500 text-xs mb-1">
                        Starts from
                      </div>
                    )}
                    <div className="text-right">
                      {hotel.oldPrice && (
                        <span className="text-gray-500 text-sm line-through mr-1">
                          ₹{hotel.oldPrice}
                        </span>
                      )}
                      <span className="text-black text-xl font-bold">
                        ₹{hotel.newPrice}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 text-right">
                      per night / room
                      <br />
                      (Exclusive of Tax)
                    </div>
                  </div>
                  <button className="border border-gray-400 rounded-full px-5 py-2 text-gray-800 text-sm hover:bg-gray-200 transition">
                    {hotel.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyMainPage;
