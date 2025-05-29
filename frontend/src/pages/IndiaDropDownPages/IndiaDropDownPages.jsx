// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import IndianCityPageBanner from "../IndianCityPage/IndianCityPageBanner/IndianCityPageBanner";
// import TourPackageCard from "../../components/CommanSections/TourPackageCard/TourPackageCard";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import BgImg from "../../assets/images/637921896094475779.png";
// import BE_URL from "../../config";

// const IndiaDropDownPages = () => {
//   const { StateNameSlag } = useParams();
//   const [packages, setPackages] = useState([]);
//   const [stateImage, setStateImage] = useState(null);
//   const [city, setCity] = useState("ALL");
//   const [stateDescription, setStateDescription] = useState("");

//   const FormattedPath = StateNameSlag.toLowerCase()
//     .replace(/-/g, " ")
//     .replace(/[^a-z0-9\s]/g, "")
//     .replace(/\b\w/g, (char) => char.toUpperCase());

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const stateRes = await axios.get(`${BE_URL}/packageStateName`);
//         const allStates = stateRes.data.data;

//         const matchedState = allStates.find((state) => {
//           const slug = state.package_state_name
//             .toLowerCase()
//             .replace(/\s+/g, "-");
//           return slug === StateNameSlag;
//         });

//         if (matchedState) {
//           const stateId = matchedState.id;
//           setStateDescription(matchedState.description);
//           setStateImage(matchedState.image);

//           const packageRes = await axios.get(
//             `${BE_URL}/packageDataDetails/byStateId/${stateId}`
//           );
//           const packageList = packageRes.data.data || [];

//           const packagesWithAreas = await Promise.all(
//             packageRes.data.data.map(async (pkg) => {
//               try {
//                 const areaRes = await axios.get(
//                   `${BE_URL}/packageDataAreaName/area-names/${pkg.id}`
//                 );
//                 const areaNames = areaRes.data.data.map(
//                   (area) => area.package_area_name
//                 );
//                 return {
//                   ...pkg,
//                   area_names: areaNames,
//                 };
//               } catch (err) {
//                 console.error("Error fetching area names for package:", pkg.id);
//                 return { ...pkg, area_names: [] };
//               }
//             })
//           );

//           setPackages(packagesWithAreas);

//           setPackages(packagesWithAreas);
//         } else {
//           console.warn("No state matched slug:", StateNameSlag);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [StateNameSlag]);

//   const handleChange = (event) => {
//     setCity(event.target.value);
//   };

//   console.log(packages)

//   return (
//     <>
//       <IndianCityPageBanner
//         Heading={FormattedPath}
//         BgImg={
//           stateImage
//             ? `${BE_URL}/Images/PackageImages/PackageStateImages/${stateImage}`
//             : BgImg
//         }
//       />

//       <div className="package-details-container flex flex-col gap-5 py-10 md:px-10 px-5 max-w-screen-xl mx-auto">
//         <h2 className="text-[2rem] font-semibold">
//           {FormattedPath} Tour Packages
//         </h2>
//         {stateDescription && (
//           <p className="text-[1rem] text-gray-600 text-justify">
//             {stateDescription}
//           </p>
//         )}
//       </div>

//       <div className="max-w-screen-xl mx-auto flex justify-end items-center mb-5">
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
//             {[...new Set(packages.flatMap(pkg => pkg.area_names))].map((area, index) => (
//               <MenuItem key={index} value={area}>
//                 {area}
//               </MenuItem>
//             ))}

//           </Select>
//         </FormControl>
//       </div>

//       {packages.length > 0 ? (
//         packages.map((val, idx) => (
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
//             area_names={val.area_names}
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

// export default IndiaDropDownPages;



import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import IndianCityPageBanner from "../IndianCityPage/IndianCityPageBanner/IndianCityPageBanner";
import TourPackageCard from "../../components/CommanSections/TourPackageCard/TourPackageCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import BgImg from "../../assets/images/637921896094475779.png";
import BE_URL from "../../config";

const IndiaDropDownPages = () => {
  const { StateNameSlag } = useParams();
  const [packages, setPackages] = useState([]);
  const [stateImage, setStateImage] = useState(null);
  const [city, setCity] = useState("ALL");
  const [stateDescription, setStateDescription] = useState("");

  const FormattedPath = StateNameSlag.toLowerCase()
    .replace(/-/g, " ")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stateRes = await axios.get(`${BE_URL}/packageStateName`);
        const allStates = stateRes.data.data;

        const matchedState = allStates.find((state) => {
          const slug = state.package_state_name
            .toLowerCase()
            .replace(/\s+/g, "-");
          return slug === StateNameSlag;
        });

        if (matchedState) {
          const stateId = matchedState.id;
          setStateDescription(matchedState.description);
          setStateImage(matchedState.image);

          const packageRes = await axios.get(
            `${BE_URL}/packageDataDetails/byStateId/${stateId}`
          );
          const packageList = packageRes.data.data || [];

          const packagesWithAreas = await Promise.all(
            packageRes.data.data.map(async (pkg) => {
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

          setPackages(packagesWithAreas);

          setPackages(packagesWithAreas);
        } else {
          console.warn("No state matched slug:", StateNameSlag);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [StateNameSlag]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  console.log(packages)

  return (
    <>
      <IndianCityPageBanner
        Heading={FormattedPath}
        BgImg={
          stateImage
            ? `${BE_URL}/Images/PackageImages/PackageStateImages/${stateImage}`
            : BgImg
        }
      />

      <div className="package-details-container flex flex-col gap-5 py-10 md:px-10 px-5 max-w-screen-xl mx-auto">
        <h2 className="text-[2rem] font-semibold">
          {FormattedPath} Tour Packages
        </h2>
        {stateDescription && (
          <p className="text-[1rem] text-gray-600 text-justify">
            {stateDescription}
          </p>
        )}
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
            {[...new Set(packages.flatMap(pkg => pkg.area_names))].map((area, index) => (
              <MenuItem key={index} value={area}>
                {area}
              </MenuItem>
            ))}

          </Select>
        </FormControl>
      </div>

      {packages.length > 0 ? (
        packages
          .filter(pkg => {
            if (city === "ALL") return true;
            return pkg.area_names.includes(city);
          })
          .map((val, idx) => (
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

export default IndiaDropDownPages;
