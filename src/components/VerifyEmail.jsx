import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Button, CircularProgress } from "@mui/material";
import { CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { emailVerification } from "../redux/auth/authThunk";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const {loading} = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const data = { uid: uid, token: token };
    dispatch(emailVerification(data))
      .unwrap()
      .then(() => {
        setSuccess(true);
        toast.success("Email Verified Successfully!");
      })
      .catch((error) => {
        console.log(error);
        
        toast.error("Email Verification Failed!: " + JSON.stringify(error.message));
        setSuccess(false);
      });
  }, []);

  return (
    <Container className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <CircularProgress />
      ) : success ? (
        <div className="text-center">
          <CheckCircle className="text-green-500 w-16 h-16" />
          <Typography variant="h4" className="mt-4">
            Email Verified Successfully!
          </Typography>
          <Button variant="contained" color="primary" className="mt-4" onClick={() => {navigate("/login")}}>
            Go to Login
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <XCircle className="text-red-500 w-16 h-16" />
          <Typography variant="h4" className="mt-4">
            Verification Failed
          </Typography>
          <Button variant="contained" color="secondary" className="mt-4" onClick={() => {navigate("/register")}}>
            Retry
          </Button>
        </div>
      )}
    </Container>
  );
};

export default VerifyEmail;
