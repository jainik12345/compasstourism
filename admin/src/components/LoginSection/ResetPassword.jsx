// import React from 'react'

// const ResetPassword = () => {
//   return (
//     <div>
//       ResetPassword
//     </div>
//   )
// }

// export default ResetPassword


/** */



import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BE_URL from "../../config";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   if (!password || !confirmPassword) {
  //     setErrorMessage("Please fill in both password fields.");
  //     setOpenSnackbar(true);
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     setErrorMessage("Passwords do not match.");
  //     setOpenSnackbar(true);
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3030/admin/reset-password",
  //       {
  //         newPassword: password,
  //       }
  //     );

  //     setErrorMessage(response.data.message);
  //     setSuccess(true);
  //     setOpenSnackbar(true);
  //   } catch (error) {
  //     setErrorMessage(
  //       error.response?.data?.message || "Error updating password"
  //     );
  //     setSuccess(false);
  //     setOpenSnackbar(true);
  //   }
  // };

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setErrorMessage("Please fill in both password fields.");
      setOpenSnackbar(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(`${BE_URL}/admin/reset-password`, {
        newPassword: password,
      });

      setErrorMessage(response.data.message);
      setSuccess(true);
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error updating password"
      );
      setSuccess(false);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url("https://admin.compasstourism.com/source/upload/banners/637921896094475779.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 5,
            width: 600,
            backgroundColor: "#fff",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
            Reset Password
          </Typography>

          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            margin="normal"
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                borderRadius: "30px",
                background: "linear-gradient(to right, #00c6ff, #0072ff)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                "&:hover": {
                  background: "linear-gradient(to right, #0072ff, #005bea)",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ResetPassword;
