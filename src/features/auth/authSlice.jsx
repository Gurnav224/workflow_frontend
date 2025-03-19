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
  const { data } = await axios.get(`${apiUrl}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
});

export const fetchUsers = createAsyncThunk("auth/fetchUser", async (token) => {
  const { data } = await axios.get(`${apiUrl}/owners`,{
    headers:{
      'Authorization':`Bearer ${token}`
    }
  });
  return data;
})

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: {},
    isAuthenticated: false,
    status: "idle",
    error: null,
    owners:[]
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
      localStorage.setItem("token", action.payload);
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
      state.isAuthenticated = true;
    });
    builder.addCase(authUserAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'success';
      state.owners = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = 'failed';
      state.error = 'failed to get all users'
    })
  }
});

export const { resetStatus , logout} = authSlice.actions;

export default authSlice.reducer;
