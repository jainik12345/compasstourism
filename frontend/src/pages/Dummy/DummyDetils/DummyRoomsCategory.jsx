/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// Dummy images (replace with your actual image URLs)
const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
];

// All amenities
const amenities = [
  "Air Conditioning",
  "Wifi (Free)",
  "LED TV",
  "Western Toilet Seat",
  "Hot & Cold Water",
  "Toiletries",
  "Housekeeping",
  "Ceiling fan",
  "Chair provided with desk",
  "Wordrobe",
  "Coffee / Tea maker",
  "Dustbins",
  "Full size mirror",
  "Mineral Water",
  "Openable window",
  "Seating Area",
  "Towels",
  "Telephone",
  "Intercom",
  "Room service",
  "Bottled water",
];

// SVG checkmark icon
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-green-600 flex-shrink-0 mr-2"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// Image Slider Component
const DummyImageSlider = ({ imgList }) => {
  const sliderImages = imgList && imgList.length > 0 ? imgList : images;
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = React.useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [sliderImages.length]);

  const handleNext = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const handlePrev = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  return (
    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-md">
      <AnimatePresence>
        {sliderImages.map((image, idx) =>
          idx === currentIndex ? (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={image}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 pointer-events-none"></div>
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/70 rounded-full p-2 transition"
        aria-label="Previous Slide"
      >
        <FaAngleLeft size={22} />
      </button>
      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/70 rounded-full p-2 transition"
        aria-label="Next Slide"
      >
        <FaAngleRight size={22} />
      </button>
      {/* Dots navigation */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {sliderImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-white/50"
            } border border-gray-400`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const DummyRoomsCategory = () => {
  const [showAll, setShowAll] = useState(false);
  const AMENITIES_LIMIT = 7;
  const visibleAmenities = showAll
    ? amenities
    : amenities.slice(0, AMENITIES_LIMIT);
  const moreCount = amenities.length - AMENITIES_LIMIT;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg mt-6 p-3 md:p-6 flex flex-col md:flex-row gap-6">
      {/* LEFT: Image Slider */}
      <div className="md:w-[52%] w-full flex flex-col">
        <h1 className="text-2xl font-bold mb-1">Deluxe Cottage</h1>
        <div className="text-base text-gray-700 mb-2">
          Standard Occupancy: <span className="font-semibold">2 Guests</span>
          <span className="text-gray-500">
            {" "}
            (1 extra guest can be accommodated)
          </span>
        </div>
        <DummyImageSlider imgList={images} />
        {/* Highlights */}
        <div className="flex flex-wrap gap-6 mt-4 text-gray-800 font-medium text-base">
          <div>1 King Bed</div>
          <div>156 sq.ft.</div>
          <div>Garden View</div>
        </div>
      </div>

      {/* RIGHT: Amenities & Buttons */}
      <div className="md:w-[48%] w-full flex flex-col">
        <div className="font-semibold text-lg mb-3">Amenities</div>
        <div
          className="flex flex-col gap-2 overflow-y-auto"
          style={{ maxHeight: 270 , scrollbarWidth: "thin" }}
        >
          {visibleAmenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center text-gray-900 text-base"
            >
              <CheckIcon />
              {amenity}
            </div>
          ))}
          {!showAll && moreCount > 0 && (
            <button
              className="text-blue-600 font-medium mt-1 hover:underline text-left"
              onClick={() => setShowAll(true)}
            >
              + {moreCount} More
            </button>
          )}
          {showAll && moreCount > 0 && (
            <button
              className="text-blue-600 font-medium mt-1 hover:underline text-left"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          )}
        </div>
        {/* Bottom Buttons */}
        <div className="flex gap-4 mt-6 justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Pay Now
          </button>
          <button className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
            Pay After
          </button>
        </div>
      </div>
    </div>
  );
};

export default DummyRoomsCategory;
