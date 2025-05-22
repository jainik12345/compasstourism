import SliderImg1 from "../../../assets/images/637921896094475779.png";
import SliderImg2 from "../../../assets/images/637921896896248600.png";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const HomeBestHotelDeals = () => {
  const TestimonialArr = [
    { ImgUrl: SliderImg1, ImgTitle: "Weekend Getaways", nights: "9 Nights & 10 Days" },
    { ImgUrl: SliderImg2, ImgTitle: "Offbeat Holidays", nights: "9 Nights & 10 Days" },
    { ImgUrl: SliderImg1, ImgTitle: "Spiritual Holidays", nights: "9 Nights & 10 Days" },
    { ImgUrl: SliderImg2, ImgTitle: "Festival Tours", nights: "9 Nights & 10 Days" },
    { ImgUrl: SliderImg1, ImgTitle: "Indian Holidays", nights: "9 Nights & 10 Days" },
    { ImgUrl: SliderImg2, ImgTitle: "Wildlife Safaris", nights: "9 Nights & 10 Days" },
    { ImgUrl: SliderImg1, ImgTitle: "Luxury Stays", nights: "9 Nights & 10 Days" },
    { ImgUrl: SliderImg2, ImgTitle: "Adventure Trips", nights: "9 Nights & 10 Days" },
    { ImgUrl: SliderImg1, ImgTitle: "Beach Vacations", nights: "9 Nights & 10 Days" },
    { ImgUrl: SliderImg2, ImgTitle: "Mountain Escapes", nights: "9 Nights & 10 Days" },
  ];

  const containerRef = useRef(null);
  const [cardsPerPage, setCardsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(window.innerWidth < 768 ? 1 : 4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth / cardsPerPage;
      containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth / cardsPerPage;
      containerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    containerRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    containerRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseLeave = () => {
    if (isDragging.current) handleMouseUp();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = x - startX.current;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="container max-w-screen-xl mx-auto px-4 md:py-10 py-20 relative">
      <div className="flex md:flex-row flex-col justify-between items-center gap-5 mb-4 p-5">
        <h2 className="text-2xl font-bold text-[#2a3b57]">Best Hotel Deals</h2>
      </div>

      <div className="relative">
        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
        >
          <IoIosArrowBack size={20} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
        >
          <IoIosArrowForward size={20} />
        </button>

        <div
          ref={containerRef}
          className="flex overflow-hidden scroll-smooth snap-x snap-mandatory"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {TestimonialArr.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full md:w-1/4 px-2 snap-start"
            >
              <NavLink>

                <div className="relative rounded-xl overflow-hidden group shadow-md">
                  <img
                    src={item.ImgUrl}
                    alt={item.ImgTitle}
                    draggable={false}
                    className="w-full h-72 object-cover"
                  />
                </div>

              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeBestHotelDeals
