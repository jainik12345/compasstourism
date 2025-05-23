import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  Box,
} from "@mui/material";
import { FaRecycle } from "react-icons/fa";
import Back from "../../../components/Buttons/Back";
import RestoreData from "../../../components/Popup/RestoreData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";

const HomeBlogsTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [data, setData] = useState([]);
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const navigate = useNavigate();

  const fetchTrashedData = async () => {
    try {
      const res = await axios.get(`${BE_URL}/homeBlog/trashed`);
      const formatted = res.data.data.map((item) => ({
        ...item,
        imageUrl: `${BE_URL}/Images/HomeImages/HomeBlog/${item.image}`,
        data: Array.isArray(item.data) ? item.data : [item.data],
      }));
      setData(formatted);
    } catch (err) {
      console.error("Error fetching trashed blogs:", err);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.patch(`${BE_URL}/homeBlog/restore/${id}`);
      setShowRestorePopup(true);
      setTimeout(() => {
        setShowRestorePopup(false);
        fetchTrashedData();
      }, 2500);
    } catch (err) {
      console.error("Error restoring blog:", err);
    }
  };

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleBackClick = () => {
    navigate("/home-blogs");
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
        <h2 className="text-left font-semibold text-xl">Home Blogs Trace</h2>
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
                Title
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Image
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Data
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
                <TableCell className="border-r">{row.title}</TableCell>
                <TableCell className="border-r">
                  <img
                    src={row.imageUrl}
                    alt="Blog"
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="border-r">
                  <Box>
                    {row.data.map((block, idx) => (
                      <Box key={idx} className="mb-2">
                        <Typography
                          variant="subtitle1"
                          className="font-semibold"
                        >
                          {block.data_h}
                        </Typography>
                        <Typography variant="body2">{block.data_p}</Typography>
                      </Box>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
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

export default HomeBlogsTrace;
