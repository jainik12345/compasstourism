import { NavLink } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRef, useState, useEffect } from "react";

const HomePackagesSlider = ({ CardsData, PackageHeading, IdKey }) => {
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
    <>
      <div
        className="container max-w-screen-xl mx-auto px-4 md:py-10 py-20 relative"
        key={IdKey}
      >
        <div className="flex md:flex-row flex-col justify-between items-center gap-5 mb-4 p-5">
          <h2 className="text-2xl font-bold text-[#2a3b57]">
            {PackageHeading}
          </h2>

          <NavLink
            to={`/tours/${PackageHeading.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="text-[1rem] font-semibold px-4 py-2 transition-all duration-200 ease-in hover:text-white hover:bg-orange-color  shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)] rounded-full">
              View More
            </div>
          </NavLink>
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
            {CardsData &&
              CardsData.map((CardVal, CardIdx) => {
                return (
                  <div
                    key={CardIdx}
                    className="flex-shrink-0 w-full md:w-1/4 px-2 snap-start"
                  >
                    <NavLink to={`/tour-package/${CardVal.ImgTitle.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div className="relative rounded-xl overflow-hidden group shadow-md">
                        <img
                          src={CardVal.ImgUrl}
                          alt={CardVal.ImgTitle}
                          draggable={false}
                          className="w-full h-72 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center bg-black opacity-80 text-white px-4 transition-all duration-300 ease-in-out h-[64px] group-hover:h-75 overflow-hidden">
                          <h3 className="text-[1.3rem]">{CardVal.ImgTitle}</h3>
                          <p className="text-[1rem]">{CardVal.nights}</p>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                );
              })}
          </div>
        </div>
      </div >
    </>
  );
};

export default HomePackagesSlider;
