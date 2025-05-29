/**------------------------------------ Fetching Completed-------------------------------------------- */
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import IndianCityPageBanner from "./IndianCityPageBanner/IndianCityPageBanner";
// import TourPackageCard from "../../components/CommanSections/TourPackageCard/TourPackageCard";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import BgImg from "../../assets/images/637921896094475779.png";
// import BE_URL from "../../config";

// const IndianCityPage = () => {
//   const { cityName } = useParams();

//   const FormattedPath = cityName
//     .toLowerCase()
//     .replace(/-/g, " ")
//     .replace(/[^a-z0-9\s]/g, "")
//     .replace(/\b\w/g, (char) => char.toUpperCase());

//   const [city, setCity] = useState("ALL");
//   const [packageData, setPackageData] = useState([]);

//   useEffect(() => {
//     const fetchPackageData = async () => {
//       try {
//         // 1. Fetch all package names
//         const res = await axios.get(`${BE_URL}/packageName`);
//         const allPackages = res.data.data;

//         // 2. Find the one matching FormattedPath (e.g. "Weekend Gateways")
//         const matchedPackage = allPackages.find(
//           (pkg) =>
//             pkg.package_name.toLowerCase().trim() ===
//             FormattedPath.toLowerCase().trim()
//         );

//         if (!matchedPackage) {
//           console.warn("No matching package found for:", FormattedPath);
//           setPackageData([]);
//           return;
//         }

//         // 3. Fetch package details by package ID
//         const detailRes = await axios.get(
//           `${BE_URL}/packageDataDetails/byPackageId/${matchedPackage.id}`
//         );

//         setPackageData(detailRes.data.data || []);
//       } catch (error) {
//         console.error("Error fetching package data:", error);
//       }
//     };

//     fetchPackageData();
//   }, [FormattedPath]);

//   const handleChange = (event) => {
//     setCity(event.target.value);
//   };

//   return (
//     <>
//       <IndianCityPageBanner Heading={FormattedPath} BgImg={BgImg} />

//       <div className="package-details-container flex flex-col gap-5 py-10 md:px-10 px-5 max-w-screen-xl mx-auto">
//         <h2 className="text-[1.5rem] font-bold ">
//           {FormattedPath} Tour Packages
//         </h2>
//         {/* <p className="text-[1rem] text-gray-600 text-justify">
//           When in Goa, do as the Goans do; leave your watch at home.
//         </p> */}
//       </div>

//       <div className="max-w-screen-xl mx-auto flex justify-end items-center">
//         <FormControl className="w-50">
//           <InputLabel id="city-select-label">Cities</InputLabel>
//           <Select
//             labelId="city-select-label"
//             id="cities"
//             value={city}
//             label="Cities"
//             name="Cities"
//             onChange={handleChange}
//           >
//             <MenuItem value="ALL">All</MenuItem>
//             {/* Replace with dynamic cities if needed */}
//             {["Goa", "Delhi", "Mumbai", "Bangalore", "Kolkata"].map(
//               (cityName, index) => (
//                 <MenuItem key={index} value={cityName}>
//                   {cityName}
//                 </MenuItem>
//               )
//             )}
//           </Select>
//         </FormControl>
//       </div>

//       {packageData.length > 0 ? (
//         packageData.map((val, idx) => (
//           <TourPackageCard
//             key={idx}
//             data_title={val.data_title}
//             single_image={`${BE_URL}/Images/PackageImages/PackageDataDetails/${val.single_image}`}
//             night={val.night}
//             day={val.day}
//             data_description={val.data_description}
//             inclusions={val.inclusions}
//             multiple_images={val.multiple_images}
//             from_city_id={val.from_city_id}
//             attraction={val.attraction}
//           />
//         ))
//       ) : (
//         <p className="text-center text-gray-500 mt-10">
//           No packages found for {FormattedPath}.
//         </p>
//       )}
//     </>
//   );
// };

// export default IndianCityPage;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import IndianCityPageBanner from "./IndianCityPageBanner/IndianCityPageBanner";
import TourPackageCard from "../../components/CommanSections/TourPackageCard/TourPackageCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import BgImg from "../../assets/images/637921896094475779.png";
import BE_URL from "../../config";

const IndianCityPage = () => {
  const { cityName } = useParams();

  const FormattedPath = cityName
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const [city, setCity] = useState("ALL");
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const res = await axios.get(`${BE_URL}/packageName`);
        const allPackages = res.data.data;

        const matchedPackage = allPackages.find(
          (pkg) =>
            pkg.package_name.toLowerCase().trim() ===
            FormattedPath.toLowerCase().trim()
        );

        if (!matchedPackage) {
          console.warn("No matching package found for:", FormattedPath);
          setPackageData([]);
          return;
        }

        const detailRes = await axios.get(
          `${BE_URL}/packageDataDetails/byPackageId/${matchedPackage.id}`
        );
        const rawPackageData = detailRes.data.data || [];

        const packagesWithAreas = await Promise.all(
          rawPackageData.map(async (pkg) => {
            try {
              const areaRes = await axios.get(
                `${BE_URL}/packageDataAreaName/area-names/${pkg.id}`
              );
              const areaNames = areaRes.data.data.map(
                (area) => area.package_area_name
              );
              return {
                ...pkg,
                area_names: areaNames,
              };
            } catch (err) {
              console.error("Error fetching area names for package:", pkg.id);
              return { ...pkg, area_names: [] };
            }
          })
        );

        setPackageData(packagesWithAreas);
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };

    fetchPackageData();
  }, [cityName]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const filteredPackages = packageData.filter((pkg) => {
    if (city === "ALL") return true;
    return pkg.area_names?.includes(city);
  });

  const allCities = [
    ...new Set(packageData.flatMap((pkg) => pkg.area_names || [])),
  ];

  return (
    <>
      <IndianCityPageBanner Heading={FormattedPath} BgImg={BgImg} />

      <div className="package-details-container flex flex-col gap-5 py-10 md:px-10 px-5 max-w-screen-xl mx-auto">
        <h2 className="text-[1.5rem] font-bold ">
          {FormattedPath} Tour Packages
        </h2>
      </div>

      <div className="max-w-screen-xl mx-auto flex justify-end items-center mb-5">
        <FormControl className="w-50">
          <InputLabel id="city-select-label">Cities</InputLabel>
          <Select
            labelId="city-select-label"
            id="cities"
            value={city}
            label="Cities"
            name="Cities"
            onChange={handleChange}
          >
            <MenuItem value="ALL">All</MenuItem>
            {[...new Set(packageData.flatMap(pkg => pkg.area_names))].map((area, index) => (
              <MenuItem key={index} value={area}>
                {area}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {filteredPackages.length > 0 ? (
        filteredPackages.map((val, idx) => (
          <TourPackageCard
            key={idx}
            data_title={val.data_title}
            single_image={`${BE_URL}/Images/PackageImages/PackageDataDetails/${val.single_image}`}
            night={val.night}
            day={val.day}
            data_description={val.data_description}
            inclusions={val.inclusions}
            multiple_images={val.multiple_images}
            from_city_id={val.from_city_id}
            attraction={val.attraction}
            area_names={val.area_names}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No packages found for {FormattedPath}.
        </p>
      )}
    </>
  );
};

export default IndianCityPage;
