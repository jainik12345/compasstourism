// import React from 'react'

// const ForgotPassword = () => {
//   return (
//     <div>
//       ForgotPassword
//     </div>
//   )
// }

// export default ForgotPassword


/** */


/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { MdEmail } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3030/admin")
      .then((res) => {
        if (res.data.data.length > 0) {
          setEmail(res.data.data[0].admin_email_id);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3030/admin/send-otp", { email });
      setLoading(false);
      setShowSnackbar(true);
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError("Failed to send OTP.");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url("https://admin.compasstourism.com/source/upload/banners/637921896094475779.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: "100%", maxWidth: 420, zIndex: 2 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Forgot Password
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 3, color: "gray" }}
          >
            Enter your email to receive an OTP
          </Typography>

          <form onSubmit={handleSendOtp}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              disabled
              error={!!error}
              helperText={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MdEmail size={25} />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                  color: "#fff",
                  borderRadius: "30px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1565c0, #1e88e5)",
                  },
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                    Sending...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>

      {/* Snackbar Success Message */}
      <AnimatePresence>
        {showSnackbar && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "fixed",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 99,
            }}
          >
            <Snackbar
              open={showSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              onClose={() => setShowSnackbar(false)}
            >
              <Alert
                severity="success"
                variant="filled"
                sx={{ width: "100%", whiteSpace: "nowrap" }}
              >
                OTP Sent Successfully!
              </Alert>
            </Snackbar>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ForgotPassword;
