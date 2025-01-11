import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Mail, Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/auth/authThunk";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(forgotPassword(data))
      .unwrap()
      .then(() => {
        toast.success("Password reset link sent to your email!");
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Failed to send reset link: " + JSON.stringify(error));
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
            background: "linear-gradient(145deg, #ffffff, #f5f7fa)", // Soft white gradient
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            border: "1px solid #d4af37", // Gold border
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
            Forgot Password
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
              color: "#6c757d", // Muted gray
              fontFamily: "Georgia, serif",
              mb: 3,
            }}
          >
            Enter your email address to receive a password reset link.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
              <Mail style={{ marginRight: 8, color: "#1a237e" }} />
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
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
            <Button
              type="submit"
              variant="contained"
              startIcon={<Send />}
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "#1a237e", // Royal blue button
                color: "#ffffff",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#0d1849" }, // Darker royal blue
                boxShadow: "0 4px 12px rgba(26, 35, 126, 0.4)", // Subtle shadow
              }}
            >
              Send Reset Link
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
