/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

// Example static images, replace/add as needed or pass as props for reusability
const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
];

const DummyImageSlider = ({ imgList }) => {
  const sliderImages = imgList && imgList.length > 0 ? imgList : images;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Auto slide every 4s
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    setIntervalId(interval);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // Manual next/prev navigation
  const handleNext = () => {
    clearInterval(intervalId);
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const handlePrev = () => {
    clearInterval(intervalId);
    setCurrentIndex(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  return (
    <div className="w-full flex justify-center items-center py-8">
      {/* Slider container with max width and padding */}
      <div className="relative w-full max-w-6xl px-6 md:px-10">
        <div className="w-full h-[300px] md:h-[400px] lg:h-[520px] relative overflow-hidden rounded-xl shadow-lg">
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
                    alt={`Slide ${idx}`}
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/70 rounded-full p-2 transition"
            aria-label="Previous Slide"
          >
            <FaAngleLeft size={28} />
          </button>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/40 hover:bg-black/70 rounded-full p-2 transition"
            aria-label="Next Slide"
          >
            <FaAngleRight size={28} />
          </button>
          {/* Dots navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === currentIndex ? "bg-white" : "bg-white/50"
                } border border-gray-400`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyImageSlider;
