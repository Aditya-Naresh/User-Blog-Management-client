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
import { Lock, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../redux/auth/authThunk";
import toast from "react-hot-toast";

const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const {token, uid} = useParams();
  const disptach = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.uid = uid;
    data.token = token;
    disptach(resetPassword(data))
    .unwrap()
    .then(() => {
        toast.success("Password reset successful!");
        navigate("/login"); 
    })
    .catch((error) => {
        toast.error("Password reset failed: " + JSON.stringify(error));
    })
    .finally(() => {
        reset();
    })
  };

  // Validate if passwords match
  const password = watch("password");

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
            Reset Password
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
            Enter your new password below.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
              <Lock style={{ marginRight: 8, color: "#1a237e" }} />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
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
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
              <Lock style={{ marginRight: 8, color: "#1a237e" }} />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message}
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
              startIcon={<CheckCircle />}
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
              Reset Password
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default PasswordReset;
