import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRef, useState, useEffect } from "react";
import InquiryForm from "../../../../../components/CommanSections/InquiryForm/InquiryForm";

const HomePackagesCardinnnerHeroSection = ({}) => {
  // Testimonial Cards Logic

  const containerRef = useRef(null);
  const [cardsPerPage, setCardsPerPage] = useState(1);

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
    // hero section

    <div className="hero-cont flex md:flex-row flex-col justify-center items-start gap-10">
      {/* hero section images  */}

      <div className="relative md:w-2/3 w-full flex flex-col gap-5">
        {/* Arrows Buttons*/}
        <button
          onClick={handlePrev}
          className="absolute left-5 top-[30%]  -translate-y-1/3 z-10 bg-white p-2 rounded-full shadow"
        >
          <IoIosArrowBack size={20} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-5 top-[30%] -translate-y-1/3 z-10 bg-white p-2 rounded-full shadow"
        >
          <IoIosArrowForward size={20} />
        </button>

        {/* hero images */}

        <div
          ref={containerRef}
          className="flex overflow-hidden scroll-smooth snap-x snap-mandatory"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {HeroImgs &&
            HeroImgs.map((HeroImgs, HeroImgsIdx) => {
              return (
                <div
                  key={HeroImgsIdx}
                  className="flex-shrink-0 w-full  px-2 snap-start"
                >
                  <div className="relative rounded-xl overflow-hidden group shadow-md">
                    <img
                      src={HeroImgs}
                      alt={"IMg"}
                      draggable={false}
                      className="w-full h-100 object-cover"
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* map image section */}

        <div className="p-2 flex justify-center items-center">
          <img src={MapImg} alt="" className="w-full" />
        </div>

        {/* highlights section */}

        <div className="flex flex-col gap-5">
          <h2 className="font-semibold text-[1.5rem] text-orange-color">
            Highlights
          </h2>

          {Highlight &&
            Highlight.map((Val, Idx) => {
              return (
                <p
                  className="text-gray-500 font-semibold text-[.9rem]"
                  key={Idx}
                >
                  {Val}
                </p>
              );
            })}
        </div>
      </div>

      {/* details section */}

      <div className="details-cont md:w-1/3 w-full p-2  flex flex-col md:gap-2 gap-5">
        {/* heading */}

        <h2 className="font-bold text-[1.3rem] text-orange-color">{Heading}</h2>

        {/* total nights */}

        <p className="font-semibold text-gray-600">{TourDetails.TourNights}</p>

        {/* package route */}

        <p className="font-semibold text-gray-600">{TourDetails.TourRoute}</p>

        {/* package attraction */}

        <h2 className="text-[1.3rem] font-semibold text-orange-color">
          Attraction:
          {TourDetails.Attractions &&
            TourDetails.Attractions.map((val, idx) => {
              return (
                <li
                  key={idx}
                  className="text-[1rem] font-normal text-black mt-2"
                >
                  {val}
                </li>
              );
            })}
        </h2>

        {/* form section */}

        <InquiryForm />
      </div>
    </div>
  );
};

export default HomePackagesCardinnnerHeroSection;
