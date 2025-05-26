// import { useEffect, useRef, useState } from 'react';
// import GrCertificate from "../../../assets/images/certificateLogo.png";
// import certificateIMg from "../../../assets/images/637921896094475779.png";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { motion, AnimatePresence } from "framer-motion";

// const HomeCertificate = () => {
//     const certificateData = [
//         { ImgUrl: certificateIMg, ImgTitle: "ISO 9001:2015" },
//         { ImgUrl: certificateIMg, ImgTitle: "ISO 14001:2015" },
//         { ImgUrl: certificateIMg, ImgTitle: "ISO 45001:2018" },
//         { ImgUrl: certificateIMg, ImgTitle: "ISO 27001:2022" },
//     ];

//     const containerRef = useRef(null);
//     const [cardsPerPage, setCardsPerPage] = useState(1);
//     const [selectedImg, setSelectedImg] = useState(null);

//     useEffect(() => {
//         const handleResize = () => {
//             setCardsPerPage(window.innerWidth < 768 ? 1 : 2);
//         };
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     // Auto-scroll every 2 seconds
//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (!containerRef.current) return;

//             const container = containerRef.current;
//             const cardWidth = container.offsetWidth / cardsPerPage;

//             const maxScrollLeft = container.scrollWidth - container.clientWidth;
//             const currentScroll = container.scrollLeft;

//             if (currentScroll + cardWidth >= maxScrollLeft) {
//                 container.scrollTo({ left: 0, behavior: 'smooth' }); // Reset to start
//             } else {
//                 container.scrollBy({ left: cardWidth, behavior: 'smooth' }); // Scroll to next
//             }
//         }, 2000);

//         return () => clearInterval(interval); // Cleanup on unmount
//     }, [cardsPerPage]);



//     const handleNext = () => {
//         if (containerRef.current) {
//             const cardWidth = containerRef.current.offsetWidth / cardsPerPage;
//             containerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
//         }
//     };

//     const handlePrev = () => {
//         if (containerRef.current) {
//             const cardWidth = containerRef.current.offsetWidth / cardsPerPage;
//             containerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
//         }
//     };

//     const isDragging = useRef(false);
//     const startX = useRef(0);
//     const scrollLeft = useRef(0);

//     const handleMouseDown = (e) => {
//         isDragging.current = true;
//         containerRef.current.classList.add("cursor-grabbing");
//         startX.current = e.pageX;
//         scrollLeft.current = containerRef.current.scrollLeft;
//     };

//     const handleMouseUp = () => {
//         isDragging.current = false;
//         containerRef.current.classList.remove("cursor-grabbing");
//     };

//     const handleMouseLeave = () => {
//         if (isDragging.current) handleMouseUp();
//     };

//     const handleMouseMove = (e) => {
//         if (!isDragging.current) return;
//         e.preventDefault();
//         const x = e.pageX;
//         const walk = x - startX.current;
//         containerRef.current.scrollLeft = scrollLeft.current - walk;
//     };

//     return (
//         <div className='bg-gray-100'>
//             <div className="container mx-auto max-w-screen-xl flex md:flex-row flex-col py-20 px-10 ">
//                 <div className="section md:w-1/2 w-full text-center p-5 flex flex-col items-center justify-center">
//                     <h6 className="font-semibold text-orange-color mb-1">AWARDS &</h6>
//                     <h3 className="font-bold text-[2rem] mb-5">Accreditation</h3>
//                     <p className="text-gray-800 text-[1rem] font-semibold">
//                         A symbolic representation of the trust our clients have in us and
//                         the successful journey over the years. Driving us to be at our best
//                         and keep marching forward!
//                     </p>
//                 </div>

//                 <div className="container px-4 md:py-10 py-20 relative">
//                     <div className="relative">
//                         <button
//                             onClick={handlePrev}
//                             className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-gray-300 p-2 rounded-full shadow"
//                         >
//                             <IoIosArrowBack size={20} />
//                         </button>

//                         <button
//                             onClick={handleNext}
//                             className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-gray-300 p-2 rounded-full shadow"
//                         >
//                             <IoIosArrowForward size={20} />
//                         </button>

//                         <div
//                             ref={containerRef}
//                             className="flex overflow-hidden scroll-smooth snap-x snap-mandatory"
//                             onMouseDown={handleMouseDown}
//                             onMouseLeave={handleMouseLeave}
//                             onMouseUp={handleMouseUp}
//                             onMouseMove={handleMouseMove}
//                         >
//                             {certificateData.map((CardVal, CardIdx) => (
//                                 <div
//                                     key={CardIdx}
//                                     className="flex-shrink-0 w-full md:w-1/2 px-2 py-5 snap-start"
//                                 >
//                                     <div
//                                         className="relative rounded-xl overflow-hidden group flex flex-col justify-center items-center gap-5 px-5 py-10 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
//                                         onClick={() => setSelectedImg(CardVal.ImgUrl)}
//                                     >
//                                         <img src={GrCertificate} alt="LOGO" className='h-20 select-none' />
//                                         <h2 className='text-center select-none'>
//                                             Certified for {CardVal.ImgTitle}
//                                         </h2>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Image Modal */}
//             <AnimatePresence>
//                 {selectedImg && (
//                     <motion.div
//                         className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5"
//                         onClick={() => setSelectedImg(null)}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                     >
//                         <motion.div
//                             className="relative h-fit w-fit p-2 bg-white rounded-xl shadow-lg"
//                             initial={{ scale: 0.9, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             exit={{ scale: 0.9, opacity: 0 }}
//                             transition={{ duration: 0.3 }}
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <img
//                                 src={selectedImg}
//                                 alt="Enlarged Certificate"
//                                 className="max-h-[70vh] max-w-full object-contain rounded-md"
//                             />
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default HomeCertificate;


import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import GrCertificate from "../../../assets/images/certificateLogo.png";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import BE_URL from "../../../config"; // Adjust the import based on your project structure


const HomeCertificate = () => {
    const [certificateData, setCertificateData] = useState([]);
    const [cardsPerPage, setCardsPerPage] = useState(1);
    const [selectedImg, setSelectedImg] = useState(null);
    const containerRef = useRef(null);

    // Fetch data using Axios
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await axios.get(`${BE_URL}/homeCertificate`);
                if (response.data.status === "success") {
                    const formatted = response.data.data.map(item => ({
                        ImgUrl: BASE_IMAGE_URL + item.image,
                        ImgTitle: item.title,
                    }));
                    setCertificateData(formatted);
                }
            } catch (error) {
                console.error("Failed to fetch certificates:", error);
            }
        };

        fetchCertificates();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setCardsPerPage(window.innerWidth < 768 ? 1 : 2);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const cardWidth = container.offsetWidth / cardsPerPage;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            const currentScroll = container.scrollLeft;

            if (currentScroll + cardWidth >= maxScrollLeft) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [cardsPerPage]);

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
        <div className='bg-gray-100'>
            <div className="container mx-auto max-w-screen-xl flex md:flex-row flex-col py-20 px-10">
                <div className="section md:w-1/2 w-full text-center p-5 flex flex-col items-center justify-center">
                    <h6 className="font-semibold text-orange-color mb-1">AWARDS &</h6>
                    <h3 className="font-bold text-[2rem] mb-5">Accreditation</h3>
                    <p className="text-gray-800 text-[1rem] font-semibold">
                        A symbolic representation of the trust our clients have in us and
                        the successful journey over the years. Driving us to be at our best
                        and keep marching forward!
                    </p>
                </div>

                <div className="container px-4 md:py-10 py-20 relative">
                    <div className="relative">
                        <button
                            onClick={handlePrev}
                            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-gray-300 p-2 rounded-full shadow"
                        >
                            <IoIosArrowBack size={20} />
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-gray-300 p-2 rounded-full shadow"
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
                            {certificateData.map((card, idx) => (
                                <div
                                    key={idx}
                                    className="flex-shrink-0 w-full md:w-1/2 px-2 py-5 snap-start"
                                >
                                    <div
                                        className="relative rounded-xl overflow-hidden group flex flex-col justify-center items-center gap-5 px-5 py-10 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
                                        onClick={() => setSelectedImg(card.ImgUrl)}
                                    >
                                        <img src={GrCertificate} alt="LOGO" className='h-20 select-none' />
                                        <h2 className='text-center select-none'>
                                            Certified for {card.ImgTitle}
                                        </h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5"
                        onClick={() => setSelectedImg(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative h-fit w-fit p-2 bg-white rounded-xl shadow-lg"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImg}
                                alt="Enlarged Certificate"
                                className="max-h-[70vh] max-w-full object-contain rounded-md"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HomeCertificate;
