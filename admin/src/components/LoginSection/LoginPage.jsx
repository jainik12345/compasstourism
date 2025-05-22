// import React from 'react'

// const LoginPage = () => {
//   return (
//     <div>
//       Jainik 
//     </div>
//   )
// }

// export default LoginPage



import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  Link,
  Paper,
} from "@mui/material";
import { MdEmail, MdLock } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import BE_URL from "../../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(newErrors);
    if (!hasError) {
      try {
        const res = await axios.post(`${BE_URL}/admin/login`, {
          email,
          password,
        });

        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome to Renest Admin Panel!",
          });

          navigate("/private-policy");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error?.response?.data?.message || "Something went wrong",
        });
      }
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
        position: "relative",
        backgroundImage: `url("https://admin.compasstourism.com/source/upload/banners/637921896094475779.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
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
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          width: "100%",
          maxWidth: "1200px",
          padding: 2,
        }}
      >
        {/* Left Side - Welcome Text */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "3rem",
            fontWeight: "bold",
            textShadow: "2px 2px 10px rgba(0,0,0,0.6)",
          }}
        >
          Welcome Back!
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ flex: 1 }}
        >
          <Container maxWidth="xl">
            <Paper
              elevation={6}
              sx={{
                padding: 4,
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              }}
            >
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Renest Hotel Admin Panel
              </Typography>

              <Typography variant="body1" sx={{ mb: 3 }}>
                Sign in to start your session
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MdEmail size={25} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MdLock size={25} />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                >
                  <Link
                    href="/forgot-password"
                    underline="hover"
                    sx={{ color: "red", fontSize: 14 }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                      color: "#fff",
                      borderRadius: "30px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(135deg, #1565c0, #1e88e5)",
                        boxShadow: "0 6px 25px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              </form>
            </Paper>
          </Container>
        </motion.div>
      </Box>
    </Box>
  );
};

export default LoginPage;