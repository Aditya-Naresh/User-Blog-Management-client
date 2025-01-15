import { createSlice } from "@reduxjs/toolkit";
import { emailVerification, loginUser } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: localStorage.getItem("username") || null,
    user_id: localStorage.getItem("user_id") || null,
    accessToken: localStorage.getItem("access_token") || null,
    refreshToken: localStorage.getItem("refresh_token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.username = null;
      state.user_id = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        localStorage.setItem("username", action.payload.username);
        state.user_id = action.payload.id;
        localStorage.setItem("user_id", action.payload.id);
        state.accessToken = action.payload.access_token;
        localStorage.setItem("access_token", action.payload.access_token);
        state.refreshToken = action.payload.refresh_token;
        localStorage.setItem("refresh_token", action.payload.refresh_token);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(emailVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(emailVerification.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(emailVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
