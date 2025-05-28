/* eslint-disable no-unused-vars */
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { FaReply, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Trace from "../../components/Buttons/Trace";
import axios from "axios";
import BE_URL from "../../config";

const Inquire = () => {
  const [page, setPage] = useState(1);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showReplySuccess, setShowReplySuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const rowsPerPage = 10;
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BE_URL}/inquire`);
        if (response.data.status === "success") {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchData();
  }, []);

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleReplyClick = (row) => {
    setSelectedRow(row);
    setShowReplyDialog(true);
  };

  const handleReplyClose = () => {
    setShowReplyDialog(false);
    setSelectedRow(null);
  };

  const handleReplySubmit = async () => {
    if (!replyMessage.trim() || !selectedRow?.email_id) {
      alert("Reply message and recipient email are required.");
      return;
    }

    setSending(true);

    try {
      const response = await axios.post(`${BE_URL}/inquire/reply`, {
        toEmail: selectedRow.email_id,
        replyMessage: replyMessage,
      });

      if (response.data.status === "success") {
        setShowReplySuccess(true);
        setShowReplyDialog(false);
        setReplyMessage("");
      } else {
        alert(
          `Failed to send reply: ${response.data.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("An error occurred while sending the reply. Please try again.");
    } finally {
      setSending(false);
      setTimeout(() => setShowReplySuccess(false), 2000);
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      const response = await axios.delete(`${BE_URL}/inquire/${id}`);
      if (response.data.status === "success") {
        setData((prevData) => prevData.filter((row) => row.id !== id));
        setShowDeleteSuccess(true);
        setTimeout(() => {
          setShowDeleteSuccess(false);
        }, 2000);
      } else {
        alert("Failed to delete the contact form entry.");
      }
    } catch (error) {
      console.error("Error deleting contact form:", error);
      alert("An error occurred while deleting. Please try again.");
    }
  };

  const handleBackClick = () => {
    navigate("/inquire/trace");
  };

  return (
    <div className="p-4 rounded-xl bg-white">
      <div className=" pb-4 flex justify-between">
        <Trace onClick={handleBackClick} />
        <h2 className="text-xl font-semibold mb-4">Contact Form Details</h2>
      </div>

      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r !font-extrabold text-base text-left">
                ID
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                First Name
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Last Name
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Email Address
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Mobile Number
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Message
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Inquire
              </TableCell>
              <TableCell className="!font-extrabold text-base text-left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition-all duration-300 border-t border-gray-300"
              >
                <TableCell className="border-r text-left">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.firstname}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.lastname}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.email_id}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.mobile_number}
                </TableCell>
                <TableCell className="border-r text-left">
                  <div className="w-full h-16 overflow-y-auto text-sm whitespace-pre-wrap">
                    {row.message}
                  </div>
                </TableCell>
                 <TableCell className="border-r text-left">
                  <div className="w-full h-16 overflow-y-auto text-sm whitespace-pre-wrap">
                    {row.inquire}
                  </div>
                </TableCell>
                <TableCell className="text-left flex items-center">
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-4"
                    onClick={() => handleReplyClick(row)}
                  >
                    <FaReply size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    <FaTrash size={20} />
                  </button>
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
            onChange={handleChangePage}
            color="primary"
          />
        </div>
      </TableContainer>

      {/* Reply Dialog */}
      <Dialog
        open={showReplyDialog}
        onClose={handleReplyClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reply to Contact</DialogTitle>
        <DialogContent>
          <p className="mb-2 text-sm text-gray-700">
            <strong>To:</strong> {selectedRow?.email_id}
          </p>

          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            label="Your Reply"
            placeholder="Type Your Response Here..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleReplyClose}
            color="secondary"
            disabled={sending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleReplySubmit}
            variant="contained"
            color="primary"
            disabled={sending}
          >
            {sending ? "Sending..." : "Submit Reply"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Notifications */}
      {showReplySuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
          <p className="font-medium">Reply Sent Successfully</p>
        </div>
      )}
      {showDeleteSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
          <p className="font-medium">Deleted Successfully</p>
        </div>
      )}
    </div>
  );
};

export default Inquire;
