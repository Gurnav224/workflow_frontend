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

export const fetchProject = createAsyncThunk(
  "project/getProjectAsync",
  async (query) => {
    const { data } = await axios.get(`${apiUrl}/all?${query}`);
    return data;
  }
);

export const fetchProjectById = createAsyncThunk(
  "project/getProjectByIdAsync",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${apiUrl}/?${projectId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    status: "idle",
    error: null,
    projects: [],
    project: {},
  },
  reducers: {
    sortLowToHigh: (state) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      state.project.tasks.sort((a, b) => {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    },
    sortHighToLow: (state) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      state.project.tasks.sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    },
    sortNewestByDate:(state) => {
      state.project.tasks.sort((a, b) => {
        return new Date(b.dueDate) - new Date(a.dueDate)
      })
    },
    sortOldestByDate:(state) => {
      state.project.tasks.sort((a,b) => {
        return new Date(a.dueDate) - new Date(b.dueDate)
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addProjectAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addProjectAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.projects = [...state.projects, action.payload];
      state.error = "";
    });
    builder.addCase(addProjectAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(fetchProject.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      state.status = "success";
      state.projects = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProject.rejected, (state) => {
      state.status = "failed";
      state.projects = [];
      state.error = "no Project Found";
    });
    builder.addCase(fetchProjectById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProjectById.fulfilled, (state, action) => {
      state.status = "success";
      state.project = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProjectById.rejected, (state, action) => {
      console.log(action);
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const { sortLowToHigh , sortHighToLow, sortNewestByDate , sortOldestByDate} = projectSlice.actions;

export default projectSlice.reducer;
