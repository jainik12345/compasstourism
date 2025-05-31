import React, { useEffect, useRef, useState } from "react";

// Dummy data (replace with props/data as needed)
const hotel = {
  stars: 3,
  name: "Nirvana Resort",
  location: "Approx 4 km from SOU parking, Statue of Unity",
  rating: 4,
  ratingOutOf: 5,
  navTabs: [
    "About Hotel",
    "Facilities",
    "Room Category",
    "Traveler Reviews",
    "Hotel Rules",
  ],
};

const DummyHeaderBanner = () => {
  const [isSticky, setIsSticky] = useState(false);
  const bannerRef = useRef(null);
  const [bannerTop, setBannerTop] = useState(null);

  // Update bannerTop whenever layout changes (responsive)
  useEffect(() => {
    const calcBannerTop = () => {
      if (bannerRef.current) {
        setBannerTop(
          bannerRef.current.getBoundingClientRect().top + window.scrollY
        );
      }
    };
    calcBannerTop();
    window.addEventListener("resize", calcBannerTop);
    return () => window.removeEventListener("resize", calcBannerTop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (bannerTop === null) return;
      if (window.scrollY >= bannerTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [bannerTop]);

  const bannerHeight = bannerRef.current?.offsetHeight || 0;

  return (
    <>
      {isSticky && (
        <div style={{ height: bannerHeight }} className="w-full"></div>
      )}
      <div
        ref={bannerRef}
        className={`w-full z-50 bg-[#f5f5f5] transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 shadow-xl border-b border-gray-200"
            : "relative"
        }`}
        style={{ minHeight: "110px" }}
      >
        <div
          className="mx-auto flex flex-col md:flex-row items-start md:items-center justify-between
            px-2 sm:px-4 md:px-8 py-4 w-full"
          style={{ maxWidth: "1920px" }}
        >
          {/* Left: Hotel info */}
          <div className="w-full md:w-auto">
            {/* Stars */}
            <div className="flex gap-1 mb-1">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  &#9733;
                </span>
              ))}
            </div>
            {/* Name */}
            <div className="text-xl sm:text-2xl font-semibold text-black mb-1">
              {hotel.name}
            </div>
            {/* Location */}
            <div className="text-sm sm:text-base text-gray-700 mb-2">
              {hotel.location}
            </div>
          </div>
          {/* Right: Nav Tabs */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-x-16 md:gap-y-0 justify-between md:justify-end">
              {hotel.navTabs.map((tab) => (
                <button
                  key={tab}
                  className="flex-1 text-sm sm:text-base text-gray-800 font-medium bg-transparent border-none focus:outline-none hover:text-black transition px-2 py-2 text-center"
                  style={{ minWidth: 0 }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DummyHeaderBanner;
