import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    status: "idle",
    error: null,
    token: null,
  },
  reducers: {},
});

export default authSlice.reducer;
