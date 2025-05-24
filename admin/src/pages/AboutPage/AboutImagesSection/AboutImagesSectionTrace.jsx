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
} from "@mui/material";
import { FaRecycle } from "react-icons/fa";
import Back from "../../../components/Buttons/Back";
import RestoreData from "../../../components/Popup/RestoreData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";

const AboutImagesSectionTrace = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [rowsPerPage] = useState(10);
  const navigate = useNavigate();

  const fetchTrashedData = async () => {
    try {
      const res = await axios.get(`${BE_URL}/aboutImageSection/trashed`);
      // IMPORTANT: about_images is already an array, no need to parse
      const formatted = res.data.data.map((item) => ({
        ...item,
        images: item.about_images
          ? item.about_images.map(
              (filename) =>
                `${BE_URL}/Images/AboutImages/AboutImageSection/${filename}`
            )
          : [],
      }));
      setData(formatted);
    } catch (err) {
      console.error("Error fetching trashed data:", err);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.patch(`${BE_URL}/aboutImageSection/restore/${id}`);
      setShowRestorePopup(true);
      setTimeout(() => {
        setShowRestorePopup(false);
        fetchTrashedData();
      }, 2500);
    } catch (err) {
      console.error("Error restoring item:", err);
    }
  };

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleBackClick = () => {
    navigate("/about-images-section");
  };

  useEffect(() => {
    fetchTrashedData();
  }, []);

  return (
    <div className="p-4 rounded-xl bg-white">
      {showRestorePopup && (
        <RestoreData onClose={() => setShowRestorePopup(false)} />
      )}

      <div className="flex justify-between mb-4">
        <h2 className="text-left font-semibold text-xl">
          About Images Section Trace
        </h2>
        <Back onClick={handleBackClick} />
      </div>

      <hr className="border-gray-300 mb-6" />

      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r !font-extrabold text-base text-left">
                ID
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Images
              </TableCell>
              <TableCell className="!font-extrabold text-base text-left">
                Restore
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition-all duration-300 border-t border-gray-300"
              >
                <TableCell className="border-r">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border-r text-left">
                  <div className="flex gap-2 flex-wrap">
                    {row.images.map((img, idx) => (
                      // <img
                      //   key={idx}
                      //   src={img}
                      //   alt={`Image ${idx + 1}`}
                      //   className="w-16 h-16 object-cover rounded"
                      //   onError={(e) => {
                      //     e.target.src = "/placeholder.jpg"; // fallback image if needed
                      //   }}
                      // />
                      <img
                        key={idx}
                        src={img}
                        alt={`Image ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          // Prevent infinite loop by only replacing src once
                          if (!e.target.dataset.error) {
                            e.target.dataset.error = "true";
                            e.target.src = "/placeholder.jpg";
                          }
                        }}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-left">
                  <button
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={() => handleRestore(row.id)}
                  >
                    <FaRecycle size={22} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default AboutImagesSectionTrace;
