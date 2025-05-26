// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Typography,
//   Box,
// } from "@mui/material";
// import axios from "axios";
// import BE_URL from "../../../config";

// const PackageDataDetails = () => {
//   const [packageNames, setPackageNames] = useState([]);
//   const [selectedPackageId, setSelectedPackageId] = useState("");
//   const [details, setDetails] = useState([]);
//   const [cityMap, setCityMap] = useState({});

//   // Fetch package names
//   useEffect(() => {
//     axios
//       .get(`${BE_URL}/packageName`)
//       .then((res) => setPackageNames(res.data.data))
//       .catch((err) => console.error("Failed to fetch package names:", err));
//   }, []);

//   // Fetch cities and build ID => name map
//   useEffect(() => {
//     axios
//       .get(`${BE_URL}/city`)
//       .then((res) => {
//         const map = {};
//         res.data.data.forEach((city) => {
//           map[city.id] = city.city_name;
//         });
//         setCityMap(map);
//       })
//       .catch((err) => console.error("Failed to fetch cities:", err));
//   }, []);

//   // Fetch details when package selected
//   useEffect(() => {
//     if (selectedPackageId) {
//       axios
//         .get(`${BE_URL}/packageDataDetails/${selectedPackageId}`)
//         .then((res) => {
//           const data = Array.isArray(res.data.data)
//             ? res.data.data
//             : [res.data.data];
//           setDetails(data);
//         })
//         .catch((err) => console.error("Failed to fetch details:", err));
//     } else {
//       setDetails([]);
//     }
//   }, [selectedPackageId]);

//   const handlePackageChange = (event) => {
//     setSelectedPackageId(event.target.value);
//   };

//   return (
//     <div className="p-4 rounded-xl bg-white">
//       <Typography variant="h6" gutterBottom>
//         Package Data Details
//       </Typography>

//       {/* Package Name Selector */}
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Select Package Name</InputLabel>
//         <Select
//           value={selectedPackageId}
//           onChange={handlePackageChange}
//           label="Select Package Name"
//         >
//           {packageNames.map((pkg) => (
//             <MenuItem key={pkg.id} value={pkg.id}>
//               {pkg.package_name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* Details Table */}
//       {details.length > 0 && (
//         <TableContainer component={Paper} className="shadow-md mt-4">
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Data Title</TableCell>
//                 <TableCell>Single Image</TableCell>
//                 <TableCell>Night</TableCell>
//                 <TableCell>Day</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Multiple Images</TableCell>
//                 <TableCell>Highlight</TableCell>
//                 <TableCell>From City</TableCell>
//                 <TableCell>To City</TableCell>
//                 <TableCell>Inclusions</TableCell>
//                 <TableCell>Attraction</TableCell>
//                 <TableCell>FAQs</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {details.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>{item.data_title}</TableCell>
//                   <TableCell>
//                     <img
//                       src={item.single_image}
//                       alt="Single"
//                       style={{ width: 80, height: 80, objectFit: "cover" }}
//                     />
//                   </TableCell>
//                   <TableCell>{item.night}</TableCell>
//                   <TableCell>{item.day}</TableCell>
//                   <TableCell>{item.data_description}</TableCell>
//                   <TableCell>
//                     <Box display="flex" flexWrap="wrap" gap={1}>
//                       {Array.isArray(item.multiple_images) &&
//                         item.multiple_images.map((img, idx) => (
//                           <img
//                             key={idx}
//                             src={img}
//                             alt={`Multiple ${idx}`}
//                             style={{
//                               width: 50,
//                               height: 50,
//                               objectFit: "cover",
//                             }}
//                           />
//                         ))}
//                     </Box>
//                   </TableCell>
//                   <TableCell>{item.highlight}</TableCell>
//                   <TableCell>{cityMap[item.from_city_id] || "N/A"}</TableCell>
//                   <TableCell>{cityMap[item.to_city_id] || "N/A"}</TableCell>
//                   <TableCell>
//                     <ul>
//                       {Array.isArray(item.inclusions) &&
//                         item.inclusions.map((inc, idx) => (
//                           <li key={idx}>{inc}</li>
//                         ))}
//                     </ul>
//                   </TableCell>
//                   <TableCell>
//                     <ul>
//                       {Array.isArray(item.attraction) &&
//                         item.attraction.map((att, idx) => (
//                           <li key={idx}>{att}</li>
//                         ))}
//                     </ul>
//                   </TableCell>
//                   <TableCell>
//                     <ul>
//                       {Array.isArray(item.faqs) &&
//                         item.faqs.map((faq, idx) => (
//                           <li key={idx}>
//                             <strong>Q:</strong> {faq.question}
//                             <br />
//                             <strong>A:</strong> {faq.answer}
//                           </li>
//                         ))}
//                     </ul>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// };

// export default PackageDataDetails;

/** */

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import BE_URL from "../../../config";

const PackageDataDetails = () => {
  const [packageNames, setPackageNames] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`${BE_URL}/packageName`)
      .then((res) => setPackageNames(res.data.data))
      .catch((err) => console.error("Failed to fetch package names:", err));
  }, []);

  // const fetchCityName = async (id) => {
  //   if (!id) return "";
  //   try {
  //     const res = await axios.get(`${BE_URL}/packageAreaName/data/${id}`);
  //     return res.data.data?.name || "-";
  //   } catch {
  //     return "-";
  //   }
  // };

  const fetchCityName = async (id) => {
    if (!id) return "-";
    try {
      const res = await axios.get(`${BE_URL}/packageAreaName/data/${id}`);
      return res.data.data?.[0]?.package_area_name || "-";
    } catch {
      return "-";
    }
  };

  // useEffect(() => {
  //   if (!selectedPackageId) {
  //     setDetails([]);
  //     return;
  //   }

  //   axios
  //     .get(`${BE_URL}/packageDataDetails/byPackageId/${selectedPackageId}`)
  //     .then(async (res) => {
  //       const items = Array.isArray(res.data.data)
  //         ? res.data.data
  //         : [res.data.data];

  //       const enriched = await Promise.all(
  //         items.map(async (item) => {
  //           const fromCityName = await fetchCityName(item.from_city_id);
  //           const toCityName = await fetchCityName(item.to_city_id);
  //           return {
  //             ...item,
  //             from_city_name: fromCityName,
  //             to_city_name: toCityName,
  //             multiple_images: JSON.parse(item.multiple_images || "[]"),
  //             inclusions: JSON.parse(item.inclusions || "[]"),
  //             attraction: JSON.parse(item.attraction || "[]"),
  //             faqs: JSON.parse(item.faqs || "[]"),
  //           };
  //         })
  //       );

  //       setDetails(enriched);
  //     })
  //     .catch((err) => console.error("Failed to fetch details:", err));
  // }, [selectedPackageId]);

  useEffect(() => {
    if (!selectedPackageId) {
      setDetails([]);
      return;
    }

    axios
      .get(`${BE_URL}/packageDataDetails/byPackageId/${selectedPackageId}`)
      .then(async (res) => {
        const items = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];

        const enriched = await Promise.all(
          items.map(async (item) => {
            const fromCityName = await fetchCityName(item.from_city_id);
            const toCityName = await fetchCityName(item.to_city_id);
            return {
              ...item,
              from_city_name: fromCityName,
              to_city_name: toCityName,
              multiple_images: item.multiple_images || [],
              inclusions: item.inclusions || [],
              attraction: item.attraction || [],
              faqs: item.faqs || [],
            };
          })
        );

        setDetails(enriched);
      })
      .catch((err) => console.error("Failed to fetch details:", err));
  }, [selectedPackageId]);

  return (
    <div className="p-4 rounded-xl bg-white">
      <Typography variant="h6" gutterBottom>
        Package Data Details
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Select Package Name</InputLabel>
        <Select
          value={selectedPackageId}
          onChange={(e) => setSelectedPackageId(e.target.value)}
          label="Select Package Name"
        >
          {packageNames.map((pkg) => (
            <MenuItem key={pkg.id} value={pkg.id}>
              {pkg.package_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {details.length > 0 ? (
        <TableContainer component={Paper} className="shadow-md mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data Title</TableCell>
                <TableCell>Single Image</TableCell>
                <TableCell>Night</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Multiple Images</TableCell>
                <TableCell>Highlight</TableCell>
                <TableCell>From City</TableCell>
                <TableCell>To City</TableCell>
                <TableCell>Attraction</TableCell>
                <TableCell>FAQs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.data_title}</TableCell>
                  <TableCell>
                    <img
                      src={`${BE_URL}/Images/PackageImages/PackageDataDetails/${item.single_image}`}
                      alt="Single"
                      style={{ width: 80, height: 80, objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell>{item.night}</TableCell>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{item.data_description}</TableCell>
                  <TableCell>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {item.multiple_images.map((img, idx) => (
                        <img
                          key={idx}
                          src={`${BE_URL}/Images/PackageImages/PackageDataDetails/${img}`}
                          alt={`img-${idx}`}
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <ul>
                      {item.inclusions.map((inc, idx) => (
                        <li key={idx}>{inc}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{item.from_city_name}</TableCell>
                  <TableCell>{item.to_city_name}</TableCell>
                  <TableCell>
                    <ul>
                      {item.attraction.map((att, idx) => (
                        <li key={idx}>{att}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul>
                      {item.faqs.map((faq, idx) => (
                        <li key={idx}>
                          <strong>Q:</strong> {faq.question} <br />
                          <strong>A:</strong> {faq.answer}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" color="textSecondary" className="mt-4">
          No data available for the selected package.
        </Typography>
      )}
    </div>
  );
};

export default PackageDataDetails;
