import React, { useEffect, useState } from "react";
import axios from "axios";
import BE_URL from "../../../config";
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
  FormControl,
  InputLabel,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Trace from "../../../components/Buttons/Trace";
import Add from "../../../components/Buttons/Add";
import DeleteData from "../../../components/Popup/DeleteData";

const HotelsRoomsCategoryNameDetails = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoomCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchRoomCategoryDetails(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const fetchRoomCategories = async () => {
    try {
      const res = await axios.get(`${BE_URL}/hotelRoomCategoryName`);
      setCategoryList(res.data.data);
    } catch (err) {
      console.error("Error fetching room categories", err);
    }
  };

  const fetchRoomCategoryDetails = async (categoryId) => {
    try {
      const res = await axios.get(
        `${BE_URL}/hotelRoomCategoryNameDetails/category/${categoryId}`
      );
      setData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching room category details data", err);
      setData([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BE_URL}/hotelRoomCategoryNameDetails/${id}`);
      setShowDeletePopup(true);
      fetchRoomCategoryDetails(selectedCategoryId);
    } catch (err) {
      console.error("Error deleting data", err);
    }
  };

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white">
      {/* Top Controls */}
      <div className="flex justify-between mb-4">
        <Trace
          onClick={() => navigate("/hotels-room-category-name-details/trace")}
        />
        <Add
          text="Add Room Category Name Details"
          width="w-[320px]"
          onClick={() => navigate("/hotels-room-category-name-details/insert")}
        />
      </div>

      {/* Room Category Name Selector */}
      <FormControl fullWidth className="mb-6">
        <InputLabel>Select Room Category Name</InputLabel>
        <Select
          value={selectedCategoryId}
          label="Select Room Category Name"
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          {categoryList.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.room_category_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <hr className="border-gray-300 mb-6" />

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="!font-bold">ID</TableCell>
              <TableCell className="!font-bold">Title</TableCell>
              <TableCell className="!font-bold">Images</TableCell>
              <TableCell className="!font-bold">Number Of Bed</TableCell>
              <TableCell className="!font-bold">Number of Sq Ft</TableCell>
              <TableCell className="!font-bold">View</TableCell>
              <TableCell className="!font-bold">Amenities</TableCell>
              <TableCell className="!font-bold">Price</TableCell>
              <TableCell className="!font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  {/* {Array.isArray(JSON.parse(row.images)) && */}
                  {Array.isArray(row.images) &&
                    // JSON.parse(row.images).map((img, idx) => (
                    row.images.map((img, idx) => (
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
                    ))}
                </TableCell>
                <TableCell>{row.number_of_bed}</TableCell>
                <TableCell>{row.number_of_sq_ft}</TableCell>
                <TableCell>{row.view}</TableCell>
                <TableCell>
                  {/* {Array.isArray(JSON.parse(row.amenities)) */}
                  {Array.isArray(row.amenities)
                    ? // ? JSON.parse(row.amenities).join(", ")
                      row.amenities.join(", ")
                    : ""}
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() =>
                        navigate("/hotels-room-category-name-details/update", {
                          state: { rowData: row },
                        })
                      }
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(row.id)}
                    >
                      <FaTrash size={20} />
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
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>

      {/* Delete Popup */}
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}
    </div>
  );
};

export default HotelsRoomsCategoryNameDetails;
