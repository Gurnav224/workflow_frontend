import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const apiUrl = `${import.meta.env.VITE_API_URL}`;

export const fetchTags = createAsyncThunk("task/fetchTags", async (token) => {
    const { data } = await axios.get(`${apiUrl}/tags/all`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
    return data
})

export const fetchTask = createAsyncThunk("task/fetchTask", async (query , {rejectWithValue}) => {
    try {
        const { data} = await axios.get(`${apiUrl}/tasks/all?${query ? `${query}`:``}`);
    return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})

export const addTaskAsync = createAsyncThunk("task/addTaskAsync", async (task, {rejectWithValue}) => {
    try {
        const {data } = await axios.post(`${apiUrl}/tasks/new`,task);
        return  data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})


export const fetchTaskById = createAsyncThunk("task/fetchTaskById", async (taskId , {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`${apiUrl}/tasks/${taskId}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error || 'failed to get  task by id')
    }
})

export const updateTaskById = createAsyncThunk("task/updateTaskById", async (taskId , {rejectWithValue}) => {
    try {
        const {data} = await axios.put(`${apiUrl}/tasks/${taskId}`);
        return data;
    } catch (error) {
            return rejectWithValue(error.response.data.error)
    }
})

export const taskSlice = createSlice({
    name:"task",
    initialState:{
        status:"idle",
        error:null,
        tasks:[],
        task:{},
        tags:[]
    },
    reducers:{

    },
    extraReducers:(builder) => {
            builder.addCase(fetchTags.pending, (state) => {
                state.status = 'pending'
            })
            builder.addCase(fetchTags.fulfilled, (state, action) => {
                state.status = 'loading';
                state.tags = action.payload
            } )
            builder.addCase(fetchTags.rejected, (state) => {
                state.status = 'failed';
                state.error = 'failed to get the tags'
            })
            builder.addCase(fetchTask.pending, (state) => {
                state.status = 'loading';
            })
            builder.addCase(fetchTask.fulfilled, (state , action) => {
                state.status = 'success';
                state.tasks = action.payload;
                state.error = null;
            })
            builder.addCase(fetchTask.rejected, (state , action) => {
                state.status = 'failed';
                state.error = action.payload
                state.tasks = []
            })
            builder.addCase(addTaskAsync.pending, (state) => {
                state.status = 'loading'
            })
            builder.addCase(addTaskAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.tasks = [...state.tasks, action.payload]
                state.status = ''
            })
            builder.addCase(addTaskAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            })
            builder.addCase(fetchTaskById.pending, (state) => {
                state.status = 'loading'
            })
            builder.addCase(fetchTaskById.fulfilled, (state, action) => {
                state.status = 'success';
                state.task = action.payload
                state.error = ''
            })
            builder.addCase(fetchTaskById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload 
            })
            builder.addCase(updateTaskById.pending, (state) => {
                state.status = 'loading'
            })
            builder.addCase(updateTaskById.fulfilled, (state, action) => {
                state.status = 'success';
                state.task = action.payload;
            })
            builder.addCase(updateTaskById.rejected, (state) => {
                state.status = 'failed';
                state.error = 'failed to update the task '
            })
    }
})


export default taskSlice.reducer;