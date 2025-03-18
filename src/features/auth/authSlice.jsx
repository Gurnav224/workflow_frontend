import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8888/auth";



export const signupAsync = createAsyncThunk(
  "auth/signupAsync",
  async (newUser, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/signup`, newUser);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || "failed to register");
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/login`, user);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || "failed to login");
    }
  }
);

export const authUserAsync = createAsyncThunk("auth/me", async (token) => {

  console.log(token)

  const { data } = await axios.get(`${apiUrl}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: JSON.parse(localStorage.getItem("token") || null),
    user: {},
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
    logout:(state) => {
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }

  },
  extraReducers: (builder) => {
    builder.addCase(signupAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signupAsync.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(signupAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(loginAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.status = "success";
      localStorage.setItem("token", JSON.stringify(action.payload));
      state.token = action.payload;
      state.isAuthenticated = true
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(authUserAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(authUserAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });
    builder.addCase(authUserAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { resetStatus , logout} = authSlice.actions;

export default authSlice.reducer;
