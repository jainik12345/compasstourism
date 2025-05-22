// import React from 'react'

// const VerifyOTP = () => {
//   return (
//     <div>
//       VerifyOTP
//     </div>
//   )
// }

// export default VerifyOTP


/** */


/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("Text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      const pasteOtp = pasteData.split("");
      setOtp(pasteOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      setVerifying(true);
      try {
        const response = await axios.post(
          "http://localhost:3030/admin/verify-otp",
          {
            email: "sanatanidharma586@gmail.com",
            otp: otpValue,
          }
        );

        if (response.data.message === "OTP verified successfully") {
          setShowSnackbar(true);
          setTimeout(() => {
            navigate("/reset-password", {
              state: { email: "admin@example.com" },
            });
          }, 2000);
        } else {
          setError("Invalid OTP. Please try again.");
        }
      } catch (error) {
        setError("Error verifying OTP. Please try again.");
      } finally {
        setVerifying(false);
      }
    } else {
      setError("Please enter a 6-digit OTP");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage:
          "url('https://admin.compasstourism.com/source/upload/banners/637921896094475779.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Paper
          elevation={6}
          sx={{
            px: 9,
            py: 3,
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            width: 600,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: "bold", color: "#333" }}
          >
            Verify OTP
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mb: 4,
            }}
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "1.8rem",
                    width: "3.5rem",
                    height: "3rem",
                    borderRadius: "100%",
                  },
                }}
              />
            ))}
          </Box>

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleVerify}
              disabled={verifying}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                borderRadius: "30px",
                background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #1565c0, #1e88e5)",
                },
              }}
            >
              {verifying ? "Verifying..." : "VERIFY OTP"}
            </Button>
          </Box>
        </Paper>
      </motion.div>

      {/* Snackbar popup */}
      <AnimatePresence>
        {showSnackbar && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Snackbar
              open={showSnackbar}
              autoHideDuration={2000}
              onClose={() => setShowSnackbar(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                severity="success"
                variant="filled"
                sx={{ whiteSpace: "nowrap" }}
              >
                OTP Verified! Proceeding to Reset Password
              </Alert>
            </Snackbar>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default VerifyOTP;
