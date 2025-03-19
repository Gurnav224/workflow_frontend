import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8888/project";

export const addProjectAsync = createAsyncThunk(
  "project/addProjectAsync",
  async (project, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${apiUrl}/new`, project);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchProject = createAsyncThunk("project/getProjectAsync", async () => {
    const {data } = await axios.get(`${apiUrl}/all`);
    return data;
})

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    status: "idle",
    error: null,
    projects: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProjectAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addProjectAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.projects = [...state.projects, action.payload];
    });
    builder.addCase(addProjectAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(fetchProject.pending, (state) => {
        state.status = 'loading'
    })
    builder.addCase(fetchProject.fulfilled, (state, action) => {
        state.status = 'success';
        state.projects = action.payload
    })
    builder.addCase(fetchProject.rejected, (state, action) => {
        state.status = 'failed';
        state.projects = action.payload
    })
  },
});

export default projectSlice.reducer;
