import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Link,
} from "@mui/material";
import { Mail, Lock, LogIn } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/authThunk";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login failed: " + JSON.stringify(error));
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 2, borderRadius: 1 }}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: "16px",
            background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            border: "1px solid #d4af37",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "#1a237e", // Royal blue
              fontWeight: "bold",
              fontFamily: "Georgia, serif",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
              color: "#6c757d", // Muted gray for subtitle
              fontFamily: "Georgia, serif",
              mb: 3,
            }}
          >
            Login to access your personalized blog space
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
              <Mail style={{ marginRight: 8, color: "#1a237e" }} />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4af37" }, // Gold border
                    "&:hover fieldset": { borderColor: "#1a237e" }, // Royal blue on hover
                    "&.Mui-focused fieldset": { borderColor: "#1a237e" }, // Royal blue on focus
                  },
                  "& .MuiFormLabel-root": {
                    color: "#6c757d", // Muted gray for label
                  },
                  "& .Mui-focused": {
                    color: "#1a237e", // Match label color with border
                  },
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
              <Lock style={{ marginRight: 8, color: "#1a237e" }} />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4af37" },
                    "&:hover fieldset": { borderColor: "#1a237e" },
                    "&.Mui-focused fieldset": { borderColor: "#1a237e" },
                  },
                  "& .MuiFormLabel-root": {
                    color: "#6c757d",
                  },
                  "& .Mui-focused": {
                    color: "#1a237e",
                  },
                }}
              />
            </Box>
              <Link
                href="/forgot-password"
                sx={{
                  textDecoration: "none",
                  color: "#1a237e",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot Password?
              </Link>
            <Button
              type="submit"
              variant="contained"
              startIcon={<LogIn />}
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "#1a237e", // Royal blue button
                color: "#ffffff",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#0d1849" }, // Darker royal blue on hover
                boxShadow: "0 4px 12px rgba(26, 35, 126, 0.4)", // Subtle shadow
              }}
            >
              Login
            </Button>
          </form>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Link
              href="/register"
              sx={{
                textDecoration: "none",
                color: "#1a237e",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Don't have an account? Register
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
