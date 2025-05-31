/* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// // SVG ICONS (simple, replace with your own if needed)
// const icons = {
//   parking: (
//     <svg
//       width="48"
//       height="48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="mx-auto"
//     >
//       <rect x="10" y="10" width="28" height="18" rx="4" />
//       <circle cx="16" cy="32" r="3" />
//       <circle cx="32" cy="32" r="3" />
//       <rect x="12" y="5" width="6" height="12" rx="2" />
//       <text x="15" y="15" fontSize="8" fill="black">
//         P
//       </text>
//     </svg>
//   ),
//   wifi: (
//     <svg
//       width="48"
//       height="48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"

//       className="mx-auto"
//     >
//       <rect x="14" y="30" width="20" height="6" rx="2" />
//       <circle cx="24" cy="38" r="2" />
//       <path d="M18 26a6 6 0 0 1 12 0" />
//       <path d="M12 22a12 12 0 0 1 24 0" />
//     </svg>
//   ),
//   activity: (
//     <svg
//       width="48"
//       height="48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="mx-auto"
//     >
//       <circle cx="16" cy="24" r="4" />
//       <circle cx="32" cy="24" r="4" />
//       <rect x="10" y="28" width="28" height="4" rx="1" />
//       <rect x="14" y="14" width="4" height="6" rx="1" />
//       <rect x="30" y="14" width="4" height="6" rx="1" />
//     </svg>
//   ),
//   garden: (
//     <svg
//       width="48"
//       height="48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="mx-auto"
//     >
//       <rect x="22" y="30" width="4" height="10" />
//       <circle cx="24" cy="24" r="6" />
//       <path d="M24 24 Q28 18 34 20" />
//       <path d="M24 24 Q20 18 14 20" />
//     </svg>
//   ),
//   playarea: (
//     <svg
//       width="48"
//       height="48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="mx-auto"
//     >
//       <rect x="31" y="20" width="10" height="12" rx="2" />
//       <rect x="7" y="25" width="20" height="7" rx="2" />
//       <circle cx="36" cy="18" r="2" />
//       <path d="M7 32 L37 32" />
//     </svg>
//   ),
//   restaurant: (
//     <svg
//       width="48"
//       height="48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="mx-auto"
//     >
//       <circle cx="15" cy="24" r="3" />
//       <rect x="28" y="17" width="4" height="14" rx="1" />
//       <rect x="33" y="17" width="4" height="14" rx="1" />
//       <rect x="12" y="27" width="6" height="9" rx="2" />
//       <rect x="27" y="31" width="12" height="2" rx="1" />
//     </svg>
//   ),
//   pool: (
//     <svg
//       width="48"
//       height="48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="mx-auto"
//     >
//       <rect x="10" y="28" width="28" height="6" rx="3" />
//       <path d="M14 28 Q16 26 18 28 Q20 30 22 28 Q24 26 26 28 Q28 30 30 28 Q32 26 34 28" />
//     </svg>
//   ),
//   roomservice: (
//     <svg
//       width="48"
//       height="48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="mx-auto"
//     >
//       <ellipse cx="24" cy="32" rx="16" ry="4" />
//       <rect x="20" y="18" width="8" height="8" rx="2" />
//       <path d="M24 18 L24 12" />
//       <circle cx="24" cy="11" r="1" />
//     </svg>
//   ),
//   housekeeping: (
//     <svg
//       width="48"
//       height="48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="mx-auto"
//     >
//       <rect x="18" y="22" width="12" height="14" rx="3" />
//       <rect x="14" y="32" width="20" height="4" rx="2" />
//       <rect x="22" y="16" width="4" height="6" rx="2" />
//     </svg>
//   ),
//   viewall: (
//     <svg
//       width="48"
//       height="48"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="mx-auto"
//     >
//       <rect x="10" y="10" width="8" height="8" rx="2" />
//       <rect x="26" y="10" width="8" height="8" rx="2" />
//       <rect x="10" y="26" width="8" height="8" rx="2" />
//       <rect x="26" y="26" width="8" height="8" rx="2" />
//     </svg>
//   ),
// };

// const mainFacilities = [
//   { icon: icons.parking, label: "Free Parking" },
//   { icon: icons.wifi, label: "Free WiFi" },
//   { icon: icons.activity, label: "Activity Centre / Room" },
//   { icon: icons.garden, label: "Garden" },
//   { icon: icons.playarea, label: "Children's play area" },
//   { icon: icons.restaurant, label: "Restaurant" },
//   { icon: icons.pool, label: "Swimming Pool" },
//   { icon: icons.roomservice, label: "Room service" },
//   { icon: icons.housekeeping, label: "Housekeeping" },
// ];

// const allFacilities = [
//   {
//     heading: "Safety and Hygiene",
//     titles: ["Disinfection", "Masks", "Sanitization", "Thermal Screening"],
//   },
//   {
//     heading: "Activities",
//     titles: ["Activity Centre / Room"],
//   },
//   {
//     heading: "Pool and Spa",
//     titles: ["Swimming Pool"],
//   },
//   {
//     heading: "Food & Drink",
//     titles: ["Dining Area", "Restaurant"],
//   },
//   {
//     heading: "Parking",
//     titles: [
//       <>
//         <span className="inline-block bg-green-500 text-white text-xs rounded px-2 py-0.5 mr-1 align-middle">
//           Free
//         </span>
//         <span>Available on site (reservation is not needed)</span>
//       </>,
//     ],
//   },
//   {
//     heading: "Internet",
//     titles: [
//       <>
//         <span className="inline-block bg-green-500 text-white text-xs rounded px-2 py-0.5 mr-1 align-middle">
//           Free
//         </span>
//         <span>WiFi is available in public areas and is free of charge.</span>
//       </>,
//     ],
//   },
//   {
//     heading: "Pets",
//     titles: [
//       <>
//         <span className="inline-block bg-red-600 text-white text-xs rounded px-2 py-0.5 mr-1 align-middle">
//           Not Allowed
//         </span>
//         <span>Pets are not allowed.</span>
//       </>,
//     ],
//   },
//   {
//     heading: "Front Desk Services",
//     titles: [
//       "Travel Desk",
//       "Credit Cards Accepted",
//       <>
//         Airport Transfers{" "}
//         <span className="inline-block bg-red-600 text-white text-xs rounded px-2 py-0.5 ml-1 align-middle">
//           Paid
//         </span>
//       </>,
//       <>
//         Newspaper{" "}
//         <span className="inline-block bg-green-500 text-white text-xs rounded px-2 py-0.5 ml-1 align-middle">
//           Free
//         </span>
//       </>,
//       "24 Hrs Reception",
//       <>
//         Railway Station Transfers{" "}
//         <span className="inline-block bg-red-600 text-white text-xs rounded px-2 py-0.5 ml-1 align-middle">
//           Paid
//         </span>
//       </>,
//       "First-aid services",
//       "Doctor on call",
//     ],
//   },
//   {
//     heading: "Common Areas",
//     titles: ["Garden", "Public restrooms", "Children's play area"],
//   },
//   {
//     heading: "Cleaning Services",
//     titles: ["Housekeeping"],
//   },
//   {
//     heading: "Miscellaneous",
//     titles: [
//       "Electronic keycard",
//       "Air Conditioning",
//       "CCTV",
//       "Free Wifi in Lounge / Reception area",
//       "Room service",
//       "Power Backup",
//       "Intercom",
//       "Family Rooms",
//     ],
//   },
// ];

// const collapseMotion = {
//   initial: { height: 0, opacity: 0 },
//   animate: {
//     height: "auto",
//     opacity: 1,
//     transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
//   },
//   exit: {
//     height: 0,
//     opacity: 0,
//     transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] },
//   },
// };

// const fadeInUp = {
//   initial: { opacity: 0, y: 24 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   exit: { opacity: 0, y: 24, transition: { duration: 0.3 } },
// };

// const DummyFacilities = () => {
//   const [showAll, setShowAll] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className="bg-[#f5f5f5] py-8 px-2 sm:px-8 min-h-[480px]">
//       <div className="max-w-7xl mx-auto">
//         {/* Header with arrow on right */}
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-center w-full md:w-auto">
//             Facilities at Nirvana Resort
//           </h2>
//           <button
//             className="ml-4 text-2xl transition-transform duration-200 flex-shrink-0 focus:outline-none"
//             onClick={() => setCollapsed((prev) => !prev)}
//             aria-label={collapsed ? "Show facilities" : "Hide facilities"}
//           >
//             <motion.span
//               className={`inline-block`}
//               animate={{ rotate: collapsed ? -90 : 0 }}
//               transition={{ duration: 0.25 }}
//             >
//               ▼
//             </motion.span>
//           </button>
//         </div>

//         {/* Hide/show all content by collapse */}
//         <AnimatePresence initial={false}>
//           {!collapsed && (
//             <motion.div
//               key="facilities-content"
//               variants={collapseMotion}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               className="overflow-hidden"
//             >
//               {/* Main Facilities List */}
//               <motion.div
//                 variants={fadeInUp}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 gap-y-8 justify-items-center mb-6"
//               >
//                 {mainFacilities.map((facility) => (
//                   <div
//                     key={facility.label}
//                     className="flex flex-col items-center"
//                   >
//                     <span className="bg-white rounded-full shadow p-2 mb-2 w-[60px] h-[60px] flex items-center justify-center">
//                       {facility.icon}
//                     </span>
//                     <span className="text-base md:text-lg font-medium text-gray-800 text-center">
//                       {facility.label}
//                     </span>
//                   </div>
//                 ))}
//                 {/* View All Icon */}
//                 <button
//                   className="flex flex-col items-center focus:outline-none group"
//                   onClick={() => setShowAll((x) => !x)}
//                   aria-label="View all facilities"
//                 >
//                   <span className="bg-white rounded-full shadow p-2 mb-2 w-[60px] h-[60px] flex items-center justify-center group-hover:bg-gray-100 transition">
//                     {icons.viewall}
//                   </span>
//                   <span className="text-base md:text-lg font-medium text-gray-800 underline text-center group-hover:text-blue-600">
//                     {showAll ? "Hide" : "View All"}
//                   </span>
//                 </button>
//               </motion.div>

//               <AnimatePresence>
//                 {showAll && (
//                   <motion.div
//                     key="facilities-details"
//                     variants={fadeInUp}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     className="mt-10"
//                   >
//                     <div className="w-full border-t border-gray-200 pt-10">
//                       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
//                         {allFacilities.map((section) => (
//                           <div key={section.heading}>
//                             <h3 className="font-semibold text-lg mb-3">
//                               {section.heading}
//                             </h3>
//                             <ul className="space-y-2">
//                               {section.titles.map((title, idx) => (
//                                 <li
//                                   key={idx}
//                                   className="flex items-start gap-2"
//                                 >
//                                   {/* Tick icon */}
//                                   <svg
//                                     className="w-5 h-5 text-green-600 flex-shrink-0 mt-1"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     viewBox="0 0 24 24"
//                                   >
//                                     <path
//                                       strokeLinecap="round"
//                                       strokeLinejoin="round"
//                                       d="M5 13l4 4L19 7"
//                                     />
//                                   </svg>
//                                   <span className="text-gray-700 text-base">
//                                     {title}
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default DummyFacilities;

/** */

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// SVG ICONS (simple, replace with your own if needed)
const icons = {
  parking: (
    <svg
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto"
    >
      <rect x="10" y="10" width="28" height="18" rx="4" />
      <circle cx="16" cy="32" r="3" />
      <circle cx="32" cy="32" r="3" />
      <rect x="12" y="5" width="6" height="12" rx="2" />
      <text x="15" y="15" fontSize="8" fill="black">
        P
      </text>
    </svg>
  ),
  wifi: (
    <svg
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto"
    >
      <rect x="14" y="30" width="20" height="6" rx="2" />
      <circle cx="24" cy="38" r="2" />
      <path d="M18 26a6 6 0 0 1 12 0" />
      <path d="M12 22a12 12 0 0 1 24 0" />
    </svg>
  ),
  activity: (
    <svg
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto"
    >
      <circle cx="16" cy="24" r="4" />
      <circle cx="32" cy="24" r="4" />
      <rect x="10" y="28" width="28" height="4" rx="1" />
      <rect x="14" y="14" width="4" height="6" rx="1" />
      <rect x="30" y="14" width="4" height="6" rx="1" />
    </svg>
  ),
  garden: (
    <svg
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto"
    >
      <rect x="22" y="30" width="4" height="10" />
      <circle cx="24" cy="24" r="6" />
      <path d="M24 24 Q28 18 34 20" />
      <path d="M24 24 Q20 18 14 20" />
    </svg>
  ),
  playarea: (
    <svg
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto"
    >
      <rect x="31" y="20" width="10" height="12" rx="2" />
      <rect x="7" y="25" width="20" height="7" rx="2" />
      <circle cx="36" cy="18" r="2" />
      <path d="M7 32 L37 32" />
    </svg>
  ),
  restaurant: (
    <svg
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto"
    >
      <circle cx="15" cy="24" r="3" />
      <rect x="28" y="17" width="4" height="14" rx="1" />
      <rect x="33" y="17" width="4" height="14" rx="1" />
      <rect x="12" y="27" width="6" height="9" rx="2" />
      <rect x="27" y="31" width="12" height="2" rx="1" />
    </svg>
  ),
  pool: (
    <svg
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto"
    >
      <rect x="10" y="28" width="28" height="6" rx="3" />
      <path d="M14 28 Q16 26 18 28 Q20 30 22 28 Q24 26 26 28 Q28 30 30 28 Q32 26 34 28" />
    </svg>
  ),
  roomservice: (
    <svg
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto"
    >
      <ellipse cx="24" cy="32" rx="16" ry="4" />
      <rect x="20" y="18" width="8" height="8" rx="2" />
      <path d="M24 18 L24 12" />
      <circle cx="24" cy="11" r="1" />
    </svg>
  ),
  housekeeping: (
    <svg
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto"
    >
      <rect x="18" y="22" width="12" height="14" rx="3" />
      <rect x="14" y="32" width="20" height="4" rx="2" />
      <rect x="22" y="16" width="4" height="6" rx="2" />
    </svg>
  ),
  viewall: (
    <svg
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto"
    >
      <rect x="10" y="10" width="8" height="8" rx="2" />
      <rect x="26" y="10" width="8" height="8" rx="2" />
      <rect x="10" y="26" width="8" height="8" rx="2" />
      <rect x="26" y="26" width="8" height="8" rx="2" />
    </svg>
  ),
};

const mainFacilities = [
  { icon: icons.parking, label: "Free Parking" },
  { icon: icons.wifi, label: "Free WiFi" },
  { icon: icons.activity, label: "Activity Centre / Room" },
  { icon: icons.garden, label: "Garden" },
  { icon: icons.playarea, label: "Children's play area" },
  { icon: icons.restaurant, label: "Restaurant" },
  { icon: icons.pool, label: "Swimming Pool" },
  { icon: icons.roomservice, label: "Room service" },
  { icon: icons.housekeeping, label: "Housekeeping" },
];

const allFacilities = [
  {
    heading: "Safety and Hygiene",
    titles: ["Disinfection", "Masks", "Sanitization", "Thermal Screening"],
  },
  {
    heading: "Activities",
    titles: ["Activity Centre / Room"],
  },
  {
    heading: "Pool and Spa",
    titles: ["Swimming Pool"],
  },
  {
    heading: "Food & Drink",
    titles: ["Dining Area", "Restaurant"],
  },
  {
    heading: "Parking",
    titles: [
      <>
        <span className="inline-block bg-green-500 text-white text-xs rounded px-2 py-0.5 mr-1 align-middle">
          Free
        </span>
        <span>Available on site (reservation is not needed)</span>
      </>,
    ],
  },
  {
    heading: "Internet",
    titles: [
      <>
        <span className="inline-block bg-green-500 text-white text-xs rounded px-2 py-0.5 mr-1 align-middle">
          Free
        </span>
        <span>WiFi is available in public areas and is free of charge.</span>
      </>,
    ],
  },
  {
    heading: "Pets",
    titles: [
      <>
        <span className="inline-block bg-red-600 text-white text-xs rounded px-2 py-0.5 mr-1 align-middle">
          Not Allowed
        </span>
        <span>Pets are not allowed.</span>
      </>,
    ],
  },
  {
    heading: "Front Desk Services",
    titles: [
      "Travel Desk",
      "Credit Cards Accepted",
      <>
        Airport Transfers{" "}
        <span className="inline-block bg-red-600 text-white text-xs rounded px-2 py-0.5 ml-1 align-middle">
          Paid
        </span>
      </>,
      <>
        Newspaper{" "}
        <span className="inline-block bg-green-500 text-white text-xs rounded px-2 py-0.5 ml-1 align-middle">
          Free
        </span>
      </>,
      "24 Hrs Reception",
      <>
        Railway Station Transfers{" "}
        <span className="inline-block bg-red-600 text-white text-xs rounded px-2 py-0.5 ml-1 align-middle">
          Paid
        </span>
      </>,
      "First-aid services",
      "Doctor on call",
    ],
  },
  {
    heading: "Common Areas",
    titles: ["Garden", "Public restrooms", "Children's play area"],
  },
  {
    heading: "Cleaning Services",
    titles: ["Housekeeping"],
  },
  {
    heading: "Miscellaneous",
    titles: [
      "Electronic keycard",
      "Air Conditioning",
      "CCTV",
      "Free Wifi in Lounge / Reception area",
      "Room service",
      "Power Backup",
      "Intercom",
      "Family Rooms",
    ],
  },
];

const collapseMotion = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 24, transition: { duration: 0.3 } },
};

const DummyFacilities = () => {
  const [showAll, setShowAll] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-[#f5f5f5] py-8 px-2 sm:px-8 min-h-[100px]">
      <div className="max-w-7xl mx-auto">
        {/* Header with arrow on right */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center w-full md:w-auto">
            Facilities at Nirvana Resort
          </h2>
          <button
            className="ml-4 text-2xl transition-transform duration-200 flex-shrink-0 focus:outline-none"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Show facilities" : "Hide facilities"}
          >
            <motion.span
              className={`inline-block`}
              animate={{ rotate: collapsed ? -90 : 0 }}
              transition={{ duration: 0.25 }}
            >
              ▼
            </motion.span>
          </button>
        </div>

        {/* Hide/show all content by collapse */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              key="facilities-content"
              variants={collapseMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              className="overflow-hidden"
            >
              {/* Main Facilities List */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 gap-y-8 justify-items-center mb-6"
              >
                {mainFacilities.map((facility) => (
                  <div
                    key={facility.label}
                    className="flex flex-col items-center"
                  >
                    <span className="bg-white rounded-full shadow p-2 mb-2 w-[60px] h-[60px] flex items-center justify-center">
                      {facility.icon}
                    </span>
                    <span className="text-base md:text-lg font-medium text-gray-800 text-center">
                      {facility.label}
                    </span>
                  </div>
                ))}
                {/* View All Icon */}
                <button
                  className="flex flex-col items-center focus:outline-none group"
                  onClick={() => setShowAll((x) => !x)}
                  aria-label="View all facilities"
                >
                  <span className="bg-white rounded-full shadow p-2 mb-2 w-[60px] h-[60px] flex items-center justify-center group-hover:bg-gray-100 transition">
                    {icons.viewall}
                  </span>
                  <span className="text-base md:text-lg font-medium text-gray-800 underline text-center group-hover:text-blue-600">
                    {showAll ? "Hide" : "View All"}
                  </span>
                </button>
              </motion.div>

              <AnimatePresence>
                {showAll && (
                  <motion.div
                    key="facilities-details"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="mt-10"
                  >
                    <div className="w-full border-t border-gray-200 pt-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        {allFacilities.map((section) => (
                          <div key={section.heading}>
                            <h3 className="font-semibold text-lg mb-3">
                              {section.heading}
                            </h3>
                            <ul className="space-y-2">
                              {section.titles.map((title, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  {/* Tick icon */}
                                  <svg
                                    className="w-5 h-5 text-green-600 flex-shrink-0 mt-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  <span className="text-gray-700 text-base">
                                    {title}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DummyFacilities;
