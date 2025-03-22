import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const apiUrl = "http://localhost:8888";

export const fetchTags = createAsyncThunk("task/fetchTags", async (token) => {
    const { data } = await axios.get(`${apiUrl}/tags/all`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
    return data
})

export const fetchTask = createAsyncThunk("task/fetchTask", async (status, {rejectWithValue}) => {
    
    try {
        const { data} = await axios.get(`${apiUrl}/tasks/all?status=${status}`);
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


export const taskSlice = createSlice({
    name:"task",
    initialState:{
        status:"idle",
        error:null,
        tasks:[],
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
            })
            builder.addCase(addTaskAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            })
    }
})


export default taskSlice.reducer;