// import { useRef, useState, useEffect } from "react";
// import SliderImg1 from "../../../assets/images/637921896094475779.png";
// import SliderImg2 from "../../../assets/images/637921896896248600.png";
// import ImageSlider from "../../../components/CommanSections/ImageSlider/ImageSlider";
// import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
// import BE_URL from "../../../config";
// import axios from "axios";
// import { NavLink } from "react-router-dom";


// const HomeHeroSection = () => {

//   const [SliderImgArr, setSliderImgArr] = useState([]);

//   useEffect(() => {
//     const FetchHomeImgSliderData = async () => {
//       try {
//         const response = await axios.get(`${BE_URL}/homeImageSlider`);

//         if (response.status === 200) {
//           const images = response.data.data[0].home_slider_images;

//           const formattedImages = images.map((imgName) => ({
//             ImgUrl: `${BE_URL}/Images/HomeImages/HomeImageSlider/${imgName}`,
//             ImgDescription: "", // optional, if you plan to use it later
//           }));

//           setSliderImgArr(formattedImages);
//         } else {
//           console.error("Error fetching hero slider data:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching details for", error);
//       }
//     };

//     FetchHomeImgSliderData();
//   }, []);


//   const HeroPackagesTestimonial = [
//     { ImgUrl: SliderImg1, ImgTitle: "Weekend Getaways" },
//     { ImgUrl: SliderImg2, ImgTitle: "Offbeat Holidays" },
//     { ImgUrl: SliderImg1, ImgTitle: "Spiritual Holidays" },
//     { ImgUrl: SliderImg2, ImgTitle: "Festival Tours" },
//     { ImgUrl: SliderImg1, ImgTitle: "Indian Holidays" },
//     { ImgUrl: SliderImg2, ImgTitle: "Wildlife Safaris" },
//     { ImgUrl: SliderImg1, ImgTitle: "Luxury Stays" },
//     { ImgUrl: SliderImg2, ImgTitle: "Adventure Trips" },
//     { ImgUrl: SliderImg1, ImgTitle: "Beach Vacations" },
//     { ImgUrl: SliderImg2, ImgTitle: "Mountain Escapes" },
//   ];

//   const containerRef = useRef(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [cardsPerPage, setCardsPerPage] = useState(5); // default to desktop

//   // Responsive card count
//   useEffect(() => {
//     const handleResize = () => {
//       setCardsPerPage(window.innerWidth < 768 ? 1 : 5);
//     };

//     handleResize(); // Set on load
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const totalPages = Math.ceil(HeroPackagesTestimonial.length / cardsPerPage);

//   // Drag logic
//   const isDragging = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   const handleMouseDown = (e) => {
//     isDragging.current = true;
//     containerRef.current.classList.add("cursor-grabbing");
//     startX.current = e.pageX;
//     scrollLeft.current = containerRef.current.scrollLeft;
//   };

//   const handleMouseUp = () => {
//     isDragging.current = false;
//     containerRef.current.classList.remove("cursor-grabbing");

//     const pageWidth = containerRef.current.offsetWidth;
//     const newPage = Math.round(containerRef.current.scrollLeft / pageWidth);
//     setCurrentPage(Math.min(Math.max(0, newPage), totalPages - 1));
//   };

//   const handleMouseLeave = () => {
//     if (isDragging.current) handleMouseUp();
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging.current) return;
//     e.preventDefault();
//     const x = e.pageX;
//     const walk = x - startX.current;
//     containerRef.current.scrollLeft = scrollLeft.current - walk;
//   };

//   // Scroll to current page
//   useEffect(() => {
//     const pageWidth = containerRef.current.offsetWidth;
//     containerRef.current.scrollTo({
//       left: currentPage * pageWidth,
//       behavior: "smooth",
//     });
//   }, [currentPage, cardsPerPage]);

//   // Break data into pages
//   const pages = Array.from({ length: totalPages }, (_, pageIndex) => {
//     const start = pageIndex * cardsPerPage;
//     const end = start + cardsPerPage;
//     return HeroPackagesTestimonial.slice(start, end);
//   });

//   return (
//     <div className="carousel-section relative mb-40">
//       <ImageSlider SliderImgArr={SliderImgArr} />

//       <div className="absolute top-[80%] left-[5%] right-[5%] max-w-screen-xl mx-auto bg-transparent bg-opacity-90 p-5 rounded-xl">
//         <div className="flex justify-between items-center absolute gap-10 right-10 -top-10">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
//             disabled={currentPage === 0}
//             className=" bg-gray-200 rounded-[100%] disabled:opacity-50 p-2"
//           >
//             <IoIosArrowBack size={20} />

//           </button>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
//             disabled={currentPage === totalPages - 1}
//             className=" bg-gray-200  rounded-[100%] disabled:opacity-50 p-2"
//           >
//             <IoIosArrowForward size={20} />


//           </button>
//         </div>

//         <div
//           ref={containerRef}
//           className="flex overflow-hidden scroll-smooth snap-x snap-mandatory"
//           onMouseDown={handleMouseDown}
//           onMouseLeave={handleMouseLeave}
//           onMouseUp={handleMouseUp}
//           onMouseMove={handleMouseMove}
//         >
//           {pages.map((page, pageIndex) => (
//             <div
//               key={pageIndex}
//               className={`flex-shrink-0 w-full justify-items-center snap-start grid gap-6 ${cardsPerPage === 1
//                 ? "grid-cols-1"
//                 : "grid-cols-5"
//                 }`}>

//               {page.map((item, index) => (
//                 <NavLink
//                   to={""}
//                   key={index}
//                   className=" flex w-fit p-2 flex-col items-center bg-white rounded-2xl "
//                 >
//                   <img
//                     src={item.ImgUrl}
//                     draggable={false}
//                     alt={item.ImgTitle}
//                     className="lg:w-[180px] md:[100px] w-full lg:h-[110px] md:h-[100px]  h-50 rounded-2xl object-cover mb-2 select-none"
//                   />
//                   <p className="text-center font-semibold text-sm select-none">
//                     {item.ImgTitle}
//                   </p>
//                 </NavLink>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeHeroSection;





//trying the fetching for this code 


import { useRef, useState, useEffect } from "react";
import ImageSlider from "../../../components/CommanSections/ImageSlider/ImageSlider";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import BE_URL from "../../../config";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const HomeHeroSection = () => {

  const [SliderImgArr, setSliderImgArr] = useState([]);

  const [HeroPackagesTestimonial, setHeroPackagesTestimonial] = useState();

  const { cityName } = useParams();


  // const FormattedPath = cityName.toLowerCase().replace(/-/g, " ").replace(/[^a-z0-9\s]/g, "").replace(/\b\w/g, (char) => char.toUpperCase()); // capitalizes each word


  // const FormattedPath = cityName
  // ? cityName.toLowerCase()
  //     .replace(/-/g, " ")
  //     .replace(/[^a-z0-9\s]/g, "")
  //     .replace(/\b\w/g, (char) => char.toUpperCase())
  // : "";



  //fetching this data for hero image slider 

  useEffect(() => {
    const FetchHomeImgSliderData = async () => {
      try {
        const response = await axios.get(`${BE_URL}/homeImageSlider`);

        if (response.status === 200) {
          const images = response.data.data[0].home_slider_images;

          const formattedImages = images.map((imgName) => ({
            ImgUrl: `${BE_URL}/Images/HomeImages/HomeImageSlider/${imgName}`,
            ImgDescription: "", // optional, if you plan to use it later
          }));

          setSliderImgArr(formattedImages);
        } else {
          console.error("Error fetching hero slider data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching details for", error);
      }
    };

    FetchHomeImgSliderData();
  }, []);


  //fetching this data for hero packages testimonial section 

  useEffect(() => {

    const FetchHeroPackagesData = async () => {

      try {

        const Response = await axios.get(`${BE_URL}/packageName`);

        if (Response.status === 200) {

          setHeroPackagesTestimonial(Response.data.data);

        }

      } catch (error) {

        console.log("Unable To Fetch The Of Hero Section Package Data:- ", error)
      }

    }

    FetchHeroPackagesData();

  }, []);

  
  // const HeroPackagesTestimonial = [
  //   { ImgUrl: SliderImg1, ImgTitle: "Weekend Getaways" },
  //   { ImgUrl: SliderImg2, ImgTitle: "Offbeat Holidays" },
  //   { ImgUrl: SliderImg1, ImgTitle: "Spiritual Holidays" },
  //   { ImgUrl: SliderImg2, ImgTitle: "Festival Tours" },
  //   { ImgUrl: SliderImg1, ImgTitle: "Indian Holidays" },
  //   { ImgUrl: SliderImg2, ImgTitle: "Wildlife Safaris" },
  //   { ImgUrl: SliderImg1, ImgTitle: "Luxury Stays" },
  //   { ImgUrl: SliderImg2, ImgTitle: "Adventure Trips" },
  //   { ImgUrl: SliderImg1, ImgTitle: "Beach Vacations" },
  //   { ImgUrl: SliderImg2, ImgTitle: "Mountain Escapes" },
  // ];

  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(5); // default to desktop

  // Responsive card count
  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(window.innerWidth < 768 ? 1 : 5);
    };

    handleResize(); // Set on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const totalPages = Math.ceil(HeroPackagesTestimonial.length / cardsPerPage);
  const totalPages = Math.ceil((HeroPackagesTestimonial?.length || 0) / cardsPerPage);

  // Drag logic
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

    const pageWidth = containerRef.current.offsetWidth;
    const newPage = Math.round(containerRef.current.scrollLeft / pageWidth);
    setCurrentPage(Math.min(Math.max(0, newPage), totalPages - 1));
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

  // Scroll to current page
  useEffect(() => {
    const pageWidth = containerRef.current.offsetWidth;
    containerRef.current.scrollTo({
      left: currentPage * pageWidth,
      behavior: "smooth",
    });
  }, [currentPage, cardsPerPage]);

  // Break data into pages
  const pages = Array.from({ length: totalPages }, (_, pageIndex) => {
    const start = pageIndex * cardsPerPage;
    const end = start + cardsPerPage;
    return HeroPackagesTestimonial.slice(start, end);
  });



  return (
    <div className="carousel-section relative mb-40">
      <ImageSlider SliderImgArr={SliderImgArr} />

      <div className="absolute top-[80%] left-[5%] right-[5%] max-w-screen-xl mx-auto bg-transparent bg-opacity-90 p-5 rounded-xl">
        <div className="flex justify-between items-center absolute gap-10 right-10 -top-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className=" bg-gray-200 rounded-[100%] disabled:opacity-50 p-2"
          >
            <IoIosArrowBack size={20} />

          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
            className=" bg-gray-200  rounded-[100%] disabled:opacity-50 p-2"
          >
            <IoIosArrowForward size={20} />


          </button>
        </div>

        <div
          ref={containerRef}
          className="flex overflow-hidden scroll-smooth snap-x snap-mandatory"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className={`flex-shrink-0 w-full justify-items-center snap-start grid gap-6 ${cardsPerPage === 1
                ? "grid-cols-1"
                : "grid-cols-5"
                }`}>

              {page.map((item, index) => {
                const FormattedPath = item.package_name
                  ?.toLowerCase()
                  .replace(/-/g, " ")
                  .replace(/[^a-z0-9\s]/g, "")
                  .replace(/\b\w/g, (char) => char.toUpperCase()) || "";

                return (
                  <NavLink
                    to={`/tours/${FormattedPath}`}
                    key={index}
                    className="flex w-fit p-2 flex-col items-center bg-white rounded-2xl"
                  >
                    <img
                      src={`${BE_URL}/Images/PackageImages/PackageNameImages/${item.image}`}
                      draggable={false}
                      alt={item.ImgTitle}
                      className="lg:w-[180px] md:[100px] w-full lg:h-[110px] md:h-[100px]  h-50 rounded-2xl object-cover mb-2 select-none"
                    />
                    <p className="text-center font-semibold text-sm select-none">
                      {item.package_name}
                    </p>
                  </NavLink>
                );
              })}


            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;

