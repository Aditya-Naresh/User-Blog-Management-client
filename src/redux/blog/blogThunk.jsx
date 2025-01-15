import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosConfiguration";

export const fetchCategories = createAsyncThunk(
  "blog/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/categories/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBloglist = createAsyncThunk(
  "blog/fetchBloglist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/blogs/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateViews = createAsyncThunk(
  "blog/updateViews",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`api/blog/${data}/views/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBlogPost = createAsyncThunk(
  "blog/createBlogPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/blog/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      const serializedError = {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      };
      return rejectWithValue(serializedError);
    }
  }
);

export const updateBlogPost = createAsyncThunk(
  "blog/updateBlogPost",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`api/blog/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBlogPost = createAsyncThunk(
  "blog/fetchBlogPost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/fetchBlog/${id}/`);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "blog/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/categories/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
