// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Pagination,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import Add from "../../../components/Buttons/Add";
// import DeleteData from "../../../components/Popup/DeleteData";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import BE_URL from "../../../config";
// import Trace from "../../../components/Buttons/Trace";

// const PackageStateName = () => {
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 10;
//   const [countryOptions, setCountryOptions] = useState([]);
//   const [selectedCountryId, setSelectedCountryId] = useState("");
//   const [states, setStates] = useState([]);
//   const [deleteSuccess, setDeleteSuccess] = useState(false);
//   const navigate = useNavigate();

//   // Fetch countries
//   useEffect(() => {
//     axios
//       .get(`${BE_URL}/packageCountry`)
//       .then((res) => setCountryOptions(res.data.data))
//       .catch((err) => console.error("Country fetch failed:", err));
//   }, []);

//   // Fetch state names by country
//   useEffect(() => {
//     if (selectedCountryId) {
//       axios
//         .get(`${BE_URL}/packageStateName/data/${selectedCountryId}`)
//         .then((res) => setStates(res.data.data))
//         .catch((err) => console.error("State fetch failed:", err));
//     } else {
//       setStates([]);
//     }
//   }, [selectedCountryId]);

//   // Delete handler
//   const handleDelete = (id) => {
//     axios
//       .delete(`${BE_URL}/packageStateName/${id}`)
//       .then((res) => {
//         if (res.data.status === "success") {
//           setStates((prev) => prev.filter((item) => item.id !== id));
//           setDeleteSuccess(true);
//           setTimeout(() => setDeleteSuccess(false), 2500);
//         } else {
//           console.error("Deletion failed");
//         }
//       })
//       .catch((err) => {
//         console.error("Delete error:", err);
//       });
//   };

//   // Pagination logic
//   const displayedRows = states.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handleAdd = () => {
//     navigate("/package-state-name/insert");
//   };

//   const handleUpdate = (item) => {
//     navigate("/package-state-name/update", {
//       state: { packageStateData: item },
//     });
//   };

//   const handleTraceClick = () => {
//     navigate("/package-state-name/trace");
//   };

//   const handleCountryChange = (event) => {
//     setSelectedCountryId(event.target.value);
//     setPage(1); // Reset to first page
//   };

//   return (
//     <div className="p-4 rounded-xl bg-white relative">
//       {deleteSuccess && <DeleteData />}

//       {/* Add Button */}
//       <div className="flex justify-between mb-4">
//         <Trace onClick={handleTraceClick} />
//         <Add
//           text="Add Package State Name"
//           width="w-[250px]"
//           onClick={handleAdd}
//         />
//       </div>

//       {/* Country Selector */}
//       <div className="mb-4">
//         <FormControl fullWidth>
//           <InputLabel>Select Country</InputLabel>
//           <Select
//             value={selectedCountryId}
//             onChange={handleCountryChange}
//             label="Select Country"
//           >
//             {countryOptions.map((country) => (
//               <MenuItem key={country.id} value={country.id}>
//                 {country.package_country_name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </div>

//       <hr className="border-gray-300 mb-6" />

//       {/* State Table */}
//       <TableContainer component={Paper} className="shadow-md">
//         <Table className="border border-gray-300">
//           <TableHead>
//             <TableRow className="bg-gray-100">
//               <TableCell className="border-r border-gray-300 font-bold text-base">
//                 ID
//               </TableCell>
//               <TableCell className="border-r border-gray-300 font-bold text-base">
//                 State Name
//               </TableCell>
//               <TableCell className="font-bold text-base">Action</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {displayedRows.map((row, index) => (
//               <TableRow
//                 key={row.id}
//                 className="hover:bg-gray-100 transition-all duration-300"
//               >
//                 <TableCell className="border-r">
//                   {(page - 1) * rowsPerPage + index + 1}
//                 </TableCell>
//                 <TableCell className="border-r border-gray-300">
//                   {row.package_state_name}
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex space-x-4">
//                     <button
//                       className="text-green-600 hover:text-green-800"
//                       onClick={() => handleUpdate(row)}
//                     >
//                       <FaEdit size={22} />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleDelete(row.id)}
//                     >
//                       <FaTrash size={22} />
//                     </button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* Pagination */}
//         <div className="flex justify-end p-4">
//           <Pagination
//             count={Math.ceil(states.length / rowsPerPage)}
//             page={page}
//             onChange={(e, val) => setPage(val)}
//             color="primary"
//           />
//         </div>
//       </TableContainer>
//     </div>
//   );
// };

// export default PackageStateName;

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
  Pagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import Trace from "../../../components/Buttons/Trace";

const PackageStateName = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [states, setStates] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch countries
  useEffect(() => {
    axios
      .get(`${BE_URL}/packageCountry`)
      .then((res) => setCountryOptions(res.data.data))
      .catch((err) => console.error("Country fetch failed:", err));
  }, []);

  // Fetch state names by country
  useEffect(() => {
    if (selectedCountryId) {
      axios
        .get(`${BE_URL}/packageStateName/country/${selectedCountryId}`)
        .then((res) => setStates(res.data.data))
        .catch((err) => console.error("State fetch failed:", err));
    } else {
      setStates([]);
    }
  }, [selectedCountryId]);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/packageStateName/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setStates((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const displayedRows = states.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAdd = () => navigate("/package-state-name/insert");

  const handleUpdate = (item) => {
    navigate("/package-state-name/update", {
      state: { packageStateData: item },
    });
  };

  const handleTraceClick = () => navigate("/package-state-name/trace");

  const handleCountryChange = (event) => {
    setSelectedCountryId(event.target.value);
    setPage(1);
  };

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      {/* Add Button */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add Package State Name"
          width="w-[250px]"
          onClick={handleAdd}
        />
      </div>

      {/* Country Selector */}
      <div className="mb-4">
        <FormControl fullWidth>
          <InputLabel>Select Country</InputLabel>
          <Select
            value={selectedCountryId}
            onChange={handleCountryChange}
            label="Select Country"
          >
            {countryOptions.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.package_country_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* State Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r border-gray-300 font-bold text-base">
                ID
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                State Name
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Description
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Image
              </TableCell>
              <TableCell className="font-bold text-base">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition-all duration-300"
              >
                <TableCell className="border-r">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border-r">
                  {row.package_state_name}
                </TableCell>
                <TableCell className="border-r">
                  {row.description ? row.description : "-"}
                </TableCell>
                <TableCell className="border-r">
                  {row.image ? (
                    <img
                      src={`${BE_URL}/Images/PackageImages/PackageStateImages/${row.image}`}
                      alt="State"
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-4">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleUpdate(row)}
                    >
                      <FaEdit size={22} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(row.id)}
                    >
                      <FaTrash size={22} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(states.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default PackageStateName;
