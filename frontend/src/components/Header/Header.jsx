// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { FaFacebookF, FaTwitter, FaInstagram, FaBars } from "react-icons/fa";
// import { MdClose } from "react-icons/md";
// import { FaPlus, FaMinus } from "react-icons/fa6";
// import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
// import campassLogo from "../../assets/images/compass-logo.png";
// import FloatingButtons from "./../ScrollToTop/FloatingButtons";
// import axios from "axios";
// import BE_URL from "../../config";

// const cities = [
//   "Andaman & Nicobar",
//   "Goa",
//   "Himachal Pradesh",
//   "Jammu & Kashmir",
//   "Kerala",
//   "Leh Ladakh",
//   "North East",
//   "Rajasthan",
//   "South India",
//   "Uttar Pradesh",
//   "Gujarat",
// ];

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showMobileIndia, setShowMobileIndia] = useState(false);
//   const [hoverIndia, setHoverIndia] = useState(false);
//   const [states, setStates] = useState([]);

//   // useEffect(() => {
//   //   const fetchStates = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         `${BE_URL}/packageStateName/country/1`
//   //       );
//   //       if (response.data.status === "success") {
//   //         setStates(response.data.data);
//   //       }
//   //     } catch (error) {
//   //       console.error("Failed to fetch states:", error);
//   //     }
//   //   };

//   //   fetchStates();
//   // }, []);
//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const response = await axios.get(
//           `${BE_URL}/packageStateName/country/1`
//         );
//         if (response.data.status === "success") {
//           const filteredStates = response.data.data.filter(
//             (state) => state.package_state_name.toLowerCase() !== "gujarat"
//           );
//           setStates(filteredStates);
//         }
//       } catch (error) {
//         console.error("Failed to fetch states:", error);
//       }
//     };

//     fetchStates();
//   }, []);

//   return (
//     <header className="w-full top-0 left-0 sticky z-50">
//       {/* Top Bar */}
//       <div className="bg-orange-500 text-white py-2 px-4 flex justify-between items-center text-sm">
//         <div className="flex space-x-4">
//           <a
//             href="https://facebook.com"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:text-blue-400 transition"
//           >
//             <FaFacebookF size={22} />
//           </a>
//           <a
//             href="https://twitter.com"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:text-blue-300 transition"
//           >
//             <FaTwitter size={22} />
//           </a>
//           <a
//             href="https://instagram.com"
//             target="_blank"
//             rel="noreferrer"
//             className="hover:text-red-600 transition"
//           >
//             <FaInstagram size={22} />
//           </a>
//         </div>
//         <div className="space-x-4">
//           <a
//             href="tel:+918347622244"
//             className="hover:text-gray-200 transition"
//           >
//             +91 83476 22244
//           </a>
//           <a
//             href="tel:+919723450099"
//             className="hover:text-gray-200 transition"
//           >
//             +91 97234 50099
//           </a>
//         </div>
//       </div>

//       {/* Main Navbar */}
//       <div className="bg-white shadow-md sticky top-0">
//         <div className="max-w-7xl mx-auto  flex items-center py-3 px-5 md:py-0 md:px-0 justify-between">
//           {/* Logo */}
//           <div className="text-2xl font-bold text-[#193531]">
//             <NavLink to="/">
//               <img src={campassLogo} alt="Compass Logo" className="h-10" />
//             </NavLink>
//           </div>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex space-x-6 text-gray-800 font-medium items-center relative">
//             {/* India Dropdown with 3x3 grid */}
//             <div
//               className="relative"
//               onMouseEnter={() => setHoverIndia(true)}
//               onMouseLeave={() => setHoverIndia(false)}
//             >
//               <button className="flex cursor-pointer items-center gap-1 py-5 transition-all hover:text-red-600 relative">
//                 India
//                 <span
//                   className={`transition-transform duration-500 ${
//                     hoverIndia ? "rotate-[360deg]" : ""
//                   }`}
//                 >
//                   {hoverIndia ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
//                 </span>
//                 <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></div>
//               </button>

//               {/* DROPDOWN */}
//               {hoverIndia && (
//                 <div className="absolute -left-55 top-16 border bg-white shadow-lg rounded-md grid grid-cols-2 gap-4 p-5 mt-0 w-[500px] z-50">
//                   {states.map((state) => (
//                     <NavLink
//                       key={state.id}
//                       to={`/tour/${state.package_state_name
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}`}
//                       className="hover:text-red-600 whitespace-nowrap"
//                       onClick={() => setHoverIndia(false)}
//                     >
//                       {state.package_state_name}
//                     </NavLink>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {[
//               { name: "Home", path: "/" },
//               { name: "About Us", path: "/about-us" },
//               { name: "Contact Us", path: "/contact-us" },
//               { name: "Gujarat", path: "/tour/gujarat" },
//               { name: "Statue Of Unity", path: "/unity" },
//               { name: "Rann Utsav", path: "/rann-utsav" },
//               { name: "Car Rental", path: "/car-rental" },
//             ].map(({ name, path }) => (
//               <NavLink
//                 key={path}
//                 to={path}
//                 className={({ isActive }) =>
//                   `relative py-5 transition-all ${
//                     isActive
//                       ? "text-red-600 font-semibold border-b-4 border-red-600"
//                       : "hover:text-red-600"
//                   } after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-600 hover:after:w-full after:transition-all after:duration-300`
//                 }
//               >
//                 {name}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={() => setMenuOpen(!menuOpen)}>
//               {menuOpen ? <MdClose size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Nav  */}
//         {menuOpen && (
//           <div className="md:hidden bg-white shadow-md px-4 pb-4 py-5 space-y-2">
//             {[
//               { name: "Home", path: "/" },
//               { name: "About Us", path: "/about-us" },
//               { name: "Contact Us", path: "/contact-us" },
//               { name: "Gujarat", path: "/gujarat" ,dropdown:["Regular Tour Package"," Offbeat  Tour Package","Fairs and Festival Tour Package"]},
//               { name: "Statue Of Unity", path: "/unity" },
//               { name: "Rann Utsav", path: "/rann-utsav" },
//               { name: "Car Rental", path: "/car-rental" },
//             ].map(({ name, path }) => (
//               <NavLink
//                 key={path}
//                 to={path}
//                 className="block"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {name}
//               </NavLink>
//             ))}

//             {/* India Mobile Dropdown */}
//             <div>
//               <div
//                 className="flex justify-between items-center cursor-pointer font-semibold mt-2"
//                 onClick={() => setShowMobileIndia((prev) => !prev)}
//               >
//                 <span>India</span>
//                 {showMobileIndia ? <FaMinus /> : <FaPlus />}
//               </div>
//               {showMobileIndia && (
//                 <ul className="pl-4 mt-1 space-y-1 transition-all duration-300 ease-in-out">
//                   {cities.map((city, idx) => (
//                     <li key={idx}>
//                       <NavLink
//                         // to={`/india/${city}`}
//                         to={`/tour/${city.toLowerCase().replace(/\s+/g, "-")}`}
//                         className="block"
//                         onClick={() => {
//                           setMenuOpen(false);
//                           setShowMobileIndia(false);
//                         }}
//                       >
//                         {city}
//                       </NavLink>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//       <FloatingButtons />
//     </header>
//   );
// };

// export default Header;

// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { FaFacebookF, FaTwitter, FaInstagram, FaBars } from "react-icons/fa";
// import { MdClose } from "react-icons/md";
// import { FaPlus, FaMinus } from "react-icons/fa6";
// import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
// import campassLogo from "../../assets/images/compass-logo.png";
// import FloatingButtons from "./../ScrollToTop/FloatingButtons";
// import axios from "axios";
// import BE_URL from "../../config";

// const cities = [
//   "Andaman & Nicobar",
//   "Goa",
//   "Himachal Pradesh",
//   "Jammu & Kashmir",
//   "Kerala",
//   "Leh Ladakh",
//   "North East",
//   "Rajasthan",
//   "South India",
//   "Uttar Pradesh",
//   "Gujarat",
// ];

// const gujaratDropdown = [
//   { name: "Regular Tour Package", slug: "Regular Tour Package" },
//   { name: "Offbeat Tour Package", slug: "Offbeat Tour Package" },
//   {
//     name: "Fairs and Festival Tour Package", slug: "Fairs and Festival Tour Package"
//   },
// ];

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showMobileIndia, setShowMobileIndia] = useState(false);
//   const [showMobileGujarat, setShowMobileGujarat] = useState(false);
//   const [hoverIndia, setHoverIndia] = useState(false);
//   const [hoverGujarat, setHoverGujarat] = useState(false);
//   const [states, setStates] = useState([]);

//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const response = await axios.get(`${BE_URL}/packageStateName/country/1`);
//         if (response.data.status === "success") {
//           const filteredStates = response.data.data.filter(
//             (state) => state.package_state_name.toLowerCase() !== "gujarat"
//           );
//           setStates(filteredStates);
//         }
//       } catch (error) {
//         console.error("Failed to fetch states:", error);
//       }
//     };

//     fetchStates();
//   }, []);

//   return (
//     <header className="w-full top-0 left-0 sticky z-50">
//       {/* Top Bar */}
//       <div className="bg-orange-500 text-white py-2 px-4 flex justify-between items-center text-sm">
//         <div className="flex space-x-4">
//           <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition"><FaFacebookF size={22} /></a>
//           <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition"><FaTwitter size={22} /></a>
//           <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-red-600 transition"><FaInstagram size={22} /></a>
//         </div>
//         <div className="space-x-4">
//           <a href="tel:+918347622244" className="hover:text-gray-200 transition">+91 83476 22244</a>
//           <a href="tel:+919723450099" className="hover:text-gray-200 transition">+91 97234 50099</a>
//         </div>
//       </div>

//       {/* Main Navbar */}
//       <div className="bg-white shadow-md sticky top-0">
//         <div className="max-w-7xl mx-auto flex items-center py-3 px-5 md:py-0 md:px-0 justify-between">
//           {/* Logo */}
//           <div className="text-2xl font-bold text-[#193531]">
//             <NavLink to="/">
//               <img src={campassLogo} alt="Compass Logo" className="h-10" />
//             </NavLink>
//           </div>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex space-x-6 text-gray-800 font-medium items-center relative">
//             {/* India Dropdown */}
//             <div
//               className="relative"
//               onMouseEnter={() => setHoverIndia(true)}
//               onMouseLeave={() => setHoverIndia(false)}
//             >
//               <button className="flex cursor-pointer items-center gap-1 py-5 transition-all hover:text-red-600">
//                 India
//                 <span className={`transition-transform duration-500 ${hoverIndia ? "rotate-[360deg]" : ""}`}>
//                   {hoverIndia ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
//                 </span>
//               </button>
//               {hoverIndia && (
//                 <div className="absolute -left-55 top-16 border bg-white shadow-lg rounded-md grid grid-cols-2 gap-4 p-5 mt-0 w-[500px] z-50">
//                   {states.map((state) => (
//                     <NavLink
//                       key={state.id}
//                       to={`/tour/${state.package_state_name.toLowerCase().replace(/\s+/g, "-")}`}
//                       className="hover:text-red-600 whitespace-nowrap"
//                       onClick={() => setHoverIndia(false)}
//                     >
//                       {state.package_state_name}
//                     </NavLink>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Gujarat Dropdown */}
//             <div
//               className="relative"
//               onMouseEnter={() => setHoverGujarat(true)}
//               onMouseLeave={() => setHoverGujarat(false)}
//             >
//               <button className="flex cursor-pointer items-center gap-1 py-5 transition-all hover:text-red-600">
//                 Gujarat
//                 <span className={`transition-transform duration-500 ${hoverGujarat ? "rotate-[360deg]" : ""}`}>
//                   {hoverGujarat ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
//                 </span>
//               </button>
//               {hoverGujarat && (
//                 <div className="absolute top-16 left-0 border bg-white shadow-lg rounded-md flex flex-col p-4 w-[250px] z-50">
//                   {gujaratDropdown.map((item, index) => (
//                     <NavLink
//                       key={index}
//                       to={`/gujarat-tours/${item.slug.toLowerCase().replace(/\s+/g, "-")}`}
//                       className="hover:text-red-600 py-1"
//                       onClick={() => setHoverGujarat(false)}
//                     >
//                       {item.name}
//                     </NavLink>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Other Static Links */}
//             {[
//               { name: "Home", path: "/" },
//               { name: "About Us", path: "/about-us" },
//               { name: "Contact Us", path: "/contact-us" },
//               { name: "Statue Of Unity", path: "/unity" },
//               { name: "Rann Utsav", path: "/rann-utsav" },
//               { name: "Car Rental", path: "/car-rental" },
//             ].map(({ name, path }) => (
//               <NavLink
//                 key={path}
//                 to={path}
//                 className={({ isActive }) =>
//                   `relative py-5 transition-all ${isActive
//                     ? "text-red-600 font-semibold border-b-4 border-red-600"
//                     : "hover:text-red-600"
//                   } after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-600 hover:after:w-full after:transition-all after:duration-300`
//                 }
//               >
//                 {name}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={() => setMenuOpen(!menuOpen)}>
//               {menuOpen ? <MdClose size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Nav */}
//         {menuOpen && (
//           <div className="md:hidden bg-white shadow-md px-4 pb-4 py-5 space-y-2">
//             {[
//               { name: "Home", path: "/" },
//               { name: "About Us", path: "/about-us" },
//               { name: "Contact Us", path: "/contact-us" },
//               { name: "Statue Of Unity", path: "/unity" },
//               { name: "Rann Utsav", path: "/rann-utsav" },
//               { name: "Car Rental", path: "/car-rental" },
//             ].map(({ name, path }) => (
//               <NavLink
//                 key={path}
//                 to={path}
//                 className="block"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {name}
//               </NavLink>
//             ))}

//             {/* India Dropdown (Mobile) */}
//             <div>
//               <div
//                 className="flex justify-between items-center cursor-pointer font-semibold mt-2"
//                 onClick={() => setShowMobileIndia((prev) => !prev)}
//               >
//                 <span>India</span>
//                 {showMobileIndia ? <FaMinus /> : <FaPlus />}
//               </div>
//               {showMobileIndia && (
//                 <ul className="pl-4 mt-1 space-y-1">
//                   {cities.map((city, idx) => (
//                     <li key={idx}>
//                       <NavLink
//                         to={`/tour/${city.toLowerCase().replace(/\s+/g, "-")}`}
//                         className="block"
//                         onClick={() => {
//                           setMenuOpen(false);
//                           setShowMobileIndia(false);
//                         }}
//                       >
//                         {city}
//                       </NavLink>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             {/* Gujarat Dropdown (Mobile) */}
//             <div>
//               <div
//                 className="flex justify-between items-center cursor-pointer font-semibold mt-2"
//                 onClick={() => setShowMobileGujarat((prev) => !prev)}
//               >
//                 <span>Gujarat</span>
//                 {showMobileGujarat ? <FaMinus /> : <FaPlus />}
//               </div>
//               {showMobileGujarat && (
//                 <ul className="pl-4 mt-1 space-y-1">
//                   {gujaratDropdown.map((item, idx) => (
//                     <li key={idx}>
//                       <NavLink
//                         to={`/gujarat-tours/${item.slug.toLowerCase().replace(/\s+/g, "-")}`}
//                         className="block"
//                         onClick={() => {
//                           setMenuOpen(false);
//                           setShowMobileGujarat(false);
//                         }}
//                       >
//                         {item.name}
//                       </NavLink>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//       <FloatingButtons />
//     </header>
//   );
// };

// export default Header;

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import campassLogo from "../../assets/images/compass-logo.png";
import FloatingButtons from "./../ScrollToTop/FloatingButtons";
import axios from "axios";
import BE_URL from "../../config";

const cities = [
  "Andaman & Nicobar",
  "Goa",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Kerala",
  "Leh Ladakh",
  "North East",
  "Rajasthan",
  "South India",
  "Uttar Pradesh",
  "Gujarat",
];

// const gujaratDropdown = [
//   { name: "Regular Tour Package", slug: "Regular Tour Package" },
//   { name: "Offbeat Tour Package", slug: "Offbeat Tour Package" },
//   {
//     name: "Fairs and Festival Tour Package",
//     slug: "Fairs and Festival Tour Package",
//   },
// ];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileIndia, setShowMobileIndia] = useState(false);
  const [showMobileGujarat, setShowMobileGujarat] = useState(false);
  const [hoverIndia, setHoverIndia] = useState(false);
  const [hoverGujarat, setHoverGujarat] = useState(false);
  const [states, setStates] = useState([]);

  const [gujaratPackages, setGujaratPackages] = useState([]);

  // useEffect(() => {
  //   const fetchStates = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${BE_URL}/packageStateName/country/1`
  //       );
  //       if (response.data.status === "success") {
  //         const filteredStates = response.data.data.filter(
  //           (state) => state.package_state_name.toLowerCase() !== "gujarat"
  //         );
  //         setStates(filteredStates);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch states:", error);
  //     }
  //   };

  //   fetchStates();
  // }, []);

  // useEffect(() => {
  //   const fetchStatesAndPackages = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${BE_URL}/packageStateName/country/1`
  //       );
  //       if (response.data.status === "success") {
  //         const allStates = response.data.data;
  //         const gujarat = allStates.find(
  //           (state) => state.package_state_name.toLowerCase() === "gujarat"
  //         );

  //         // Save other states excluding Gujarat
  //         const filteredStates = allStates.filter(
  //           (state) => state.package_state_name.toLowerCase() !== "gujarat"
  //         );
  //         setStates(filteredStates);

  //         // Fetch Gujarat-specific packages
  //         if (gujarat) {
  //           const pkgRes = await axios.get(
  //             `${BE_URL}/packageDataDetails/byStateId/${gujarat.id}`
  //           );
  //           if (pkgRes.data.status === "success") {
  //             setGujaratPackages(pkgRes.data.data);
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch state or Gujarat package data:", error);
  //     }
  //   };

  //   fetchStatesAndPackages();
  // }, []);

  useEffect(() => {
    const fetchStatesAndPackages = async () => {
      try {
        const response = await axios.get(
          `${BE_URL}/packageStateName/country/1`
        );
        if (response.data.status === "success") {
          const allStates = response.data.data;

          // Filter out Gujarat from the India dropdown
          const filteredStates = allStates.filter(
            (state) => state.package_state_name.toLowerCase() !== "gujarat"
          );
          setStates(filteredStates);

          // Fetch Gujarat Package Names from package_name table (assuming API exists)
          const gujaratPkgNamesRes = await axios.get(
            `${BE_URL}/packageName/by-state/1`
          );

          if (gujaratPkgNamesRes.data.status === "success") {
            setGujaratPackages(gujaratPkgNamesRes.data.data);
          }
        }
      } catch (error) {
        console.error(
          "Failed to fetch states or Gujarat package names:",
          error
        );
      }
    };

    fetchStatesAndPackages();
  }, []);

  return (
    <header className="w-full top-0 left-0 sticky z-50">
      {/* Top Bar */}
      <div className="bg-orange-500 text-white py-2 px-4 flex justify-between items-center text-sm">
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaFacebookF size={22} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-300 transition"
          >
            <FaTwitter size={22} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-600 transition"
          >
            <FaInstagram size={22} />
          </a>
        </div>
        <div className="space-x-4">
          <a
            href="tel:+918347622244"
            className="hover:text-gray-200 transition"
          >
            +91 83476 22244
          </a>
          <a
            href="tel:+919723450099"
            className="hover:text-gray-200 transition"
          >
            +91 97234 50099
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white shadow-md sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center py-3 px-5 md:py-0 md:px-0 justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-[#193531]">
            <NavLink to="/">
              <img src={campassLogo} alt="Compass Logo" className="h-10" />
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-gray-800 font-medium items-center relative">
            {/* India Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHoverIndia(true)}
              onMouseLeave={() => setHoverIndia(false)}
            >
              <button className="flex cursor-pointer items-center gap-1 py-5 transition-all hover:text-red-600">
                India
                <span
                  className={`transition-transform duration-500 ${
                    hoverIndia ? "rotate-[360deg]" : ""
                  }`}
                >
                  {hoverIndia ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
                </span>
              </button>
              {hoverIndia && (
                <div className="absolute -left-55 top-16 border bg-white shadow-lg rounded-md grid grid-cols-2 gap-4 p-5 mt-0 w-[500px] z-50">
                  {states.map((state) => (
                    <NavLink
                      key={state.id}
                      to={`/tour/${state.package_state_name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="hover:text-red-600 whitespace-nowrap"
                      onClick={() => setHoverIndia(false)}
                    >
                      {state.package_state_name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Gujarat Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHoverGujarat(true)}
              onMouseLeave={() => setHoverGujarat(false)}
            >
              <button className="flex cursor-pointer items-center gap-1 py-5 transition-all hover:text-red-600">
                Gujarat
                <span
                  className={`transition-transform duration-500 ${
                    hoverGujarat ? "rotate-[360deg]" : ""
                  }`}
                >
                  {hoverGujarat ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
                </span>
              </button>
              {/* {hoverGujarat && (
                <div className="absolute top-16 left-0 border bg-white shadow-lg rounded-md flex flex-col p-4 w-[250px] z-50">
                  {gujaratDropdown.map((item, index) => (
                    <NavLink
                      key={index}
                      to={`/gujarat-tours/${item.slug
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="hover:text-red-600 py-1"
                      onClick={() => setHoverGujarat(false)}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )} */}
              {hoverGujarat && (
                <div className="absolute top-16 left-0 border bg-white shadow-lg rounded-md flex flex-col p-4 w-[250px] z-50">
                  {gujaratPackages.map((item) => (
                    <NavLink
                      key={item.id}
                      to={`/gujarat-tours/${item.package_name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="hover:text-red-600 py-1"
                      onClick={() => setHoverGujarat(false)}
                    >
                      {item.package_name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Other Static Links */}
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about-us" },
              { name: "Contact Us", path: "/contact-us" },
              { name: "Statue Of Unity", path: "/unity" },
              { name: "Rann Utsav", path: "/rann-utsav" },
              { name: "Car Rental", path: "/car-rental" },
            ].map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative py-5 transition-all ${
                    isActive
                      ? "text-red-600 font-semibold border-b-4 border-red-600"
                      : "hover:text-red-600"
                  } after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-600 hover:after:w-full after:transition-all after:duration-300`
                }
              >
                {name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <MdClose size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md px-4 pb-4 py-5 space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about-us" },
              { name: "Contact Us", path: "/contact-us" },
              { name: "Statue Of Unity", path: "/unity" },
              { name: "Rann Utsav", path: "/rann-utsav" },
              { name: "Car Rental", path: "/car-rental" },
            ].map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </NavLink>
            ))}

            {/* India Dropdown (Mobile) */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer font-semibold mt-2"
                onClick={() => setShowMobileIndia((prev) => !prev)}
              >
                <span>India</span>
                {showMobileIndia ? <FaMinus /> : <FaPlus />}
              </div>
              {showMobileIndia && (
                <ul className="pl-4 mt-1 space-y-1">
                  {cities.map((city, idx) => (
                    <li key={idx}>
                      <NavLink
                        to={`/tour/${city.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block"
                        onClick={() => {
                          setMenuOpen(false);
                          setShowMobileIndia(false);
                        }}
                      >
                        {city}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Gujarat Dropdown (Mobile) */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer font-semibold mt-2"
                onClick={() => setShowMobileGujarat((prev) => !prev)}
              >
                <span>Gujarat</span>
                {showMobileGujarat ? <FaMinus /> : <FaPlus />}
              </div>
              {/* {showMobileGujarat && (
                <ul className="pl-4 mt-1 space-y-1">
                  {gujaratDropdown.map((item, idx) => (
                    <li key={idx}>
                      <NavLink
                        to={`/gujarat-tours/${item.slug
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block"
                        onClick={() => {
                          setMenuOpen(false);
                          setShowMobileGujarat(false);
                        }}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )} */}
              {showMobileGujarat && (
                <ul className="pl-4 mt-1 space-y-1">
                  {gujaratPackages.map((item) => (
                    <li key={item.id}>
                      <NavLink
                        to={`/gujarat-tours/${item.data_title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block"
                        onClick={() => {
                          setMenuOpen(false);
                          setShowMobileGujarat(false);
                        }}
                      >
                        {item.data_title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      <FloatingButtons />
    </header>
  );
};

export default Header;
