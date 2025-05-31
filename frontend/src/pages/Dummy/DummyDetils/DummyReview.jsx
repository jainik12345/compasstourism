/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Testimonial data
const testimonials = [
  {
    description:
      "Our stay was simply amazing! The facilities were excellent and the staff was very accommodating. Highly recommend for a family trip.",
    name: "Amit Sharma",
  },
  {
    description:
      "Clean rooms, great amenities, and a beautiful location near the Statue of Unity. Would love to visit again!",
    name: "Priya Patel",
  },
  {
    description:
      "The food was delicious and the service was top-notch. My kids loved the activity centre and pool. A memorable stay.",
    name: "Rahul Verma",
  },
  {
    description:
      "Perfect for a weekend getaway. The garden is beautiful and the rooms are very comfortable. Staff is very friendly.",
    name: "Sneha Rao",
  },
];

// Animation variants for carousel effect
const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 },
};

// For single (mobile) and for group (desktop)
const cardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, type: "spring" },
  },
  exit: (direction) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.38 },
  }),
};

const FIXED_HEIGHT = 260; // px, consistent across all cards

const DummyReview = () => {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : true
  );
  const timeoutRef = useRef(null);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slides per view and total dots
  const slidesPerView = isMobile ? 1 : 2;
  const totalDots = Math.ceil(testimonials.length / slidesPerView);

  // Auto-slide
  useEffect(() => {
    // Clear previous interval
    if (timeoutRef.current) clearInterval(timeoutRef.current);

    timeoutRef.current = setInterval(() => {
      setIndex(([prev, _]) => [
        (prev + slidesPerView) % testimonials.length,
        1,
      ]);
    }, 5500);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [slidesPerView]);

  // Dot click
  const goTo = (dotIdx) => {
    const newIndex = dotIdx * slidesPerView;
    if (newIndex === index) return;
    setIndex([newIndex, newIndex > index ? 1 : -1]);
  };

  // Figure out which testimonials to show
  let slidesToShow;
  if (isMobile) {
    slidesToShow = [index];
  } else {
    // Show two; wrap if needed
    const second =
      testimonials.length === 1 ? 0 : (index + 1) % testimonials.length;
    // Only wrap if not already at start of next group
    if (testimonials.length > 2 && index === testimonials.length - 1) {
      slidesToShow = [index, 0];
    } else {
      slidesToShow = [index, second];
    }
  }

  // Group key for AnimatePresence to control the whole row
  const groupKey = slidesToShow.join("-");

  return (
    <div className="w-full flex items-center justify-center bg-gray-50 px-2 py-12">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Carousel */}
        <div
          className={`relative w-full flex ${
            isMobile ? "flex-col items-center" : "flex-row items-stretch gap-8"
          } justify-center`}
          style={{
            minHeight: FIXED_HEIGHT,
            height: FIXED_HEIGHT,
            overflow: "visible",
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={groupKey}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`w-full flex ${
                isMobile
                  ? "flex-col items-center"
                  : "flex-row items-stretch gap-8"
              }`}
              style={{ height: FIXED_HEIGHT }}
            >
              {slidesToShow.map((slideIdx, k) => (
                <motion.div
                  key={slideIdx}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`w-full ${isMobile ? "" : "max-w-[50%]"}`}
                  style={{
                    minHeight: FIXED_HEIGHT,
                    height: FIXED_HEIGHT,
                    marginBottom: isMobile && k === 0 ? "16px" : 0,
                    display: "flex",
                    overflow: "visible",
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 flex flex-col items-center w-full justify-center h-full">
                    <p className="text-lg sm:text-xl text-gray-700 text-center mb-6 leading-relaxed">
                      "{testimonials[slideIdx].description}"
                    </p>
                    <div className="text-right w-full">
                      <span className="font-semibold text-gray-800 text-lg">
                        – {testimonials[slideIdx].name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Dots */}
        <div className="flex justify-center items-center mt-8 gap-3">
          {Array.from({ length: totalDots }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                Math.floor(index / slidesPerView) === dotIdx
                  ? "bg-blue-600 border-blue-600 scale-125"
                  : "bg-white border-gray-400"
              }`}
              onClick={() => goTo(dotIdx)}
              aria-label={`Go to testimonial group ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DummyReview;
