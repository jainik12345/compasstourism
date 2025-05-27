// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoMdClose } from "react-icons/io";


// import img1 from "../../../assets/images/637921896094475779.png";
// import img4 from "../../../assets/images/big_banner.png";
// import img3 from "../../../assets/images/637921896896248600.png";
// import img2 from "../../../assets/images/counter_bg.png";

// const AboutImageSection = () => {
//   const AboutImgArr = [img1, img2, img3, img4];
//   const [selectedImg, setSelectedImg] = useState(null);

//   return (
//     <div className="section">
//       <div className="container mx-auto grid grid-cols-3 grid-rows-2 gap-2 px-2 py-5">
//         {AboutImgArr.map((ImgUrl, Idx) => (
//           <img
//             key={Idx}
//             src={ImgUrl}
//             alt={`Image ${Idx + 1}`}
//             className={`cursor-pointer w-full h-full object-cover rounded-2xl hover:scale-102 transition-all duration-200 ease-in ${Idx === 0
//               ? "row-span-1"
//               : Idx === 1
//                 ? "row-span-1"
//                 : Idx === 2
//                   ? "row-span-2"
//                   : Idx === 3
//                     ? "col-span-2"
//                     : ""
//               }`}
//             onClick={() => setSelectedImg(ImgUrl)}
//           />
//         ))}
//       </div>

//       {/* Modal with AnimatePresence */}
//       <AnimatePresence>
//         {selectedImg && (
//           <motion.div
//             className="fixed inset-0 bg-black/70 z-50 flex items-center p-5 justify-center"
//             onClick={() => setSelectedImg(null)}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="relative h-fit  w-fit p-1 bg-white rounded-xl shadow-lg"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={selectedImg}
//                 alt="Enlarged"
//                 className="h-90 object-cover rounded-lg"
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AboutImageSection;



// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoMdClose } from "react-icons/io";
// import axios from "axios";
// import BE_URL from "../../../config";

// import img1 from "../../../assets/images/637921896094475779.png";
// import img4 from "../../../assets/images/big_banner.png";
// import img3 from "../../../assets/images/637921896896248600.png";
// import img2 from "../../../assets/images/counter_bg.png";

// const AboutImageSection = () => {
//   // const AboutImgArr = [img1, img2, img3, img4];
//   const [AboutImgArr, setAboutImgArr] = useState([]);
//   const [selectedImg, setSelectedImg] = useState(null);

//   useEffect(() => {
//     const FetchAboutImageData = async () => {
//       try {
//         const response = await axios.get(`${BE_URL}/aboutImageSection`);

//         if (response.status === 200) {
//           const AboutImgs = response.data.data.flatMap(item => item.about_images);
//           setAboutImgArr(AboutImgs);
//           console.log("About Image Array:", AboutImgs);
//         }

//       } catch (error) {
//         console.error("Error fetching about image data:", error);
//       }
//     };

//     FetchAboutImageData();
//   }, []);


//   return (
//     <div className="section">
//       <div className="container mx-auto grid grid-cols-3 grid-rows-2 gap-2  p-20">
//         {AboutImgArr.map((ImgUrl, Idx) => (
//           <img
//             key={Idx}
//             src={`${BE_URL}/Images/AboutImages/AboutImageSection/${ImgUrl}`}
//             alt={`Image ${Idx + 1}`}
//             className={`cursor-pointer w-full h-full object-cover rounded-2xl hover:scale-102 transition-all duration-200 ease-in ${Idx === 0
//               ? "row-span-1"
//               : Idx === 1
//                 ? "row-span-1"
//                 : Idx === 2
//                   ? "row-span-2"
//                   : Idx === 3
//                     ? "col-span-2"
//                     : ""
//               }`}
//             onClick={() => setSelectedImg(ImgUrl)}
//           />
//         ))}
//       </div>

//       {/* Modal with AnimatePresence */}
//       <AnimatePresence>
//         {selectedImg && (
//           <motion.div
//             className="fixed inset-0 bg-black/70 z-50 flex items-center p-5 justify-center"
//             onClick={() => setSelectedImg(null)}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="relative h-fit  w-fit p-1 bg-white rounded-xl shadow-lg"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={selectedImg}
//                 alt="Enlarged"
//                 className="h-90 object-cover rounded-lg"
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AboutImageSection;



import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import BE_URL from "../../../config";

const AboutImageSection = () => {
  const [AboutImgArr, setAboutImgArr] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const FetchAboutImageData = async () => {
      try {
        const response = await axios.get(`${BE_URL}/aboutImageSection`);
        if (response.status === 200) {
          const images = response.data.data.flatMap(item => item.about_images);
          const fullImageUrls = images.map(img => `${BE_URL}/Images/AboutImages/AboutImageSection/${img}`);
          setAboutImgArr(fullImageUrls);
        }
      } catch (error) {
        console.error("Error fetching about image data:", error);
      }
    };

    FetchAboutImageData();
  }, []);

  return (
    <div className="section">
      <div className="container mx-auto grid grid-cols-3 grid-rows-2 gap-2 md:px-10 md:py-10 px-5 py-5">
        {AboutImgArr.map((ImgUrl, Idx) => (
          <img
            key={Idx}
            src={ImgUrl}
            alt={`Image ${Idx + 1}`}
            className={`cursor-pointer w-full h-full object-cover rounded-2xl hover:scale-102 transition-all duration-200 ease-in ${
              Idx === 0
                ? "row-span-1"
                : Idx === 1
                ? "row-span-1"
                : Idx === 2
                ? "row-span-2"
                : Idx === 3
                ? "col-span-2"
                : ""
            }`}
            onClick={() => setSelectedImg(ImgUrl)}
          />
        ))}
      </div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center p-5 justify-center"
            onClick={() => setSelectedImg(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative h-fit  w-fit p-1 bg-white rounded-xl shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg}
                alt="Enlarged"
                className="h-[80vh] object-cover rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutImageSection;
