import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { LogIn, LogOut, PlusCircle } from "lucide-react"; // Import PlusCircle for Create Blog button
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { setFormModalOpen } from "../redux/blog/blogSlice";

const Navbar = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(145deg, #1a237e, #0d1849)", // Royal blue gradient
        boxShadow: "0 4px 8px rgba(26, 35, 126, 0.5)", // Subtle shadow
        borderBottom: "2px solid #d4af37", // Gold border
      }}
    >
      <Toolbar>
        {/* Logo / Brand Name */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "Georgia, serif",
            fontWeight: "bold",
            color: "#d4af37",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Blog
        </Typography>

        {/* Conditional "Create Blog" Button and Login/Logout Button */}
        <Box className="flex items-center space-x-4">
          {accessToken && (
            <Button
              startIcon={<PlusCircle />}
              onClick={() => dispatch(setFormModalOpen())}
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#d4af37", // Gold on hover
                },
              }}
            >
              Create Blog
            </Button>
          )}

          {accessToken ? (
            <Button
              startIcon={<LogOut />}
              onClick={() => {
                dispatch(logout());
              }}
              sx={{
                color: "#ffffff", // White text
                "&:hover": {
                  color: "#d4af37", // Gold on hover
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              startIcon={<LogIn />}
              onClick={() => {
                navigate("/login");
              }}
              sx={{
                color: "#ffffff", // White text
                "&:hover": {
                  color: "#d4af37", // Gold on hover
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
