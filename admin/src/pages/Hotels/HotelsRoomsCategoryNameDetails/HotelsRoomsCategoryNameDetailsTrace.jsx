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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { FaRecycle } from "react-icons/fa";
import Back from "../../../components/Buttons/Back";
import RestoreData from "../../../components/Popup/RestoreData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";

const HotelsRoomsCategoryNameDetailsTrace = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [data, setData] = useState([]);
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await axios.get(`${BE_URL}/hotelRoomCategoryName`);
      setCategoryList(res.data.data || []);
    } catch (err) {
      console.error("Error fetching room categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchTrashedDetailsByCategory = async (categoryId) => {
    if (!categoryId) {
      setData([]);
      return;
    }
    setLoadingDetails(true);
    try {
      const res = await axios.get(
        `${BE_URL}/hotelRoomCategoryNameDetails/trashed/category/${categoryId}`
      );
      setData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching trashed details data:", err);
      setData([]);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
    setPage(1);
    fetchTrashedDetailsByCategory(e.target.value);
  };

  const handleRestore = async (id) => {
    try {
      await axios.patch(`${BE_URL}/hotelRoomCategoryNameDetails/restore/${id}`);
      setShowRestorePopup(true);
      setTimeout(() => {
        setShowRestorePopup(false);
        fetchTrashedDetailsByCategory(selectedCategoryId);
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
    navigate("/hotels-room-category-name-details");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4 rounded-xl bg-white">
      {showRestorePopup && (
        <RestoreData onClose={() => setShowRestorePopup(false)} />
      )}

      <div className="flex justify-between mb-4">
        <h2 className="text-left font-semibold text-xl">
          Room Category Name Details Trace
        </h2>
        <Back onClick={handleBackClick} />
      </div>

      <hr className="border-gray-300 mb-6" />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="category-select-label">
          Select Room Category Name
        </InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategoryId}
          label="Select Room Category Name"
          onChange={handleCategoryChange}
          disabled={loadingCategories}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categoryList.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.room_category_name}
            </MenuItem>
          ))}
        </Select>
        {loadingCategories && <CircularProgress size={24} sx={{ mt: 1 }} />}
      </FormControl>

      {loadingDetails ? (
        <div className="flex justify-center py-20">
          <CircularProgress />
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">
          No trashed room category name details found for selected category.
        </p>
      ) : (
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
                  Images
                </TableCell>
                <TableCell className="border-r !font-extrabold text-base text-left">
                  Number Of Bed
                </TableCell>
                <TableCell className="border-r !font-extrabold text-base text-left">
                  Number of Sq Ft
                </TableCell>
                <TableCell className="border-r !font-extrabold text-base text-left">
                  View
                </TableCell>
                <TableCell className="border-r !font-extrabold text-base text-left">
                  Amenities
                </TableCell>
                <TableCell className="border-r !font-extrabold text-base text-left">
                  Price
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
                    {Array.isArray(row.images)
                      ? row.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={`${BE_URL}/Images/HotelImages/RoomCategoryDetailsImages/${img}`}
                            alt=""
                            style={{
                              width: 40,
                              height: 40,
                              objectFit: "cover",
                              marginRight: 4,
                              borderRadius: 4,
                            }}
                          />
                        ))
                      : ""}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.number_of_bed}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.number_of_sq_ft}
                  </TableCell>
                  <TableCell className="border-r">{row.view}</TableCell>
                  <TableCell className="border-r">
                    {Array.isArray(row.amenities)
                      ? row.amenities.join(", ")
                      : ""}
                  </TableCell>
                  <TableCell className="border-r">{row.price}</TableCell>
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
      )}
    </div>
  );
};

export default HotelsRoomsCategoryNameDetailsTrace;
