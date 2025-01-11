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
import { User, Mail, Lock, UserPlus2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/auth/authThunk";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        toast.success(
          "Registration successful! Please verify your email to login"
        );
        navigate("/login");
      });
  };

  const passwordValidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
            border: "1px solid #d4af37", // Gold border for luxury
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
            Register
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
            Create your account and join the blog community
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
              <User style={{ marginRight: 8, color: "#1a237e" }} />
              <TextField
                fullWidth
                label="Username"
                {...register("username", { required: "Username is required" })}
                error={!!errors.username}
                helperText={errors.username?.message}
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
              <Mail style={{ marginRight: 8, color: "#1a237e" }} />
              <TextField
                fullWidth
                label="Email"
                {...register("email", { required: "Email is required" })}
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
            <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
              <Lock style={{ marginRight: 8, color: "#1a237e" }} />
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: passwordValidation,
                    message:
                      "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 symbol, and be at least 8 characters long.",
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
                  required: "Password is required",
                  pattern: {
                    value: passwordValidation,
                    message:
                      "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 symbol, and be at least 8 characters long.",
                  },
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
              startIcon={<UserPlus2 />}
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
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
