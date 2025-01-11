import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosConfiguration";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/register/", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const emailVerification = createAsyncThunk(
  "auth/emailVerification",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/email-verify/", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/login/", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/forgot-password/", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/api/reset-password/", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
