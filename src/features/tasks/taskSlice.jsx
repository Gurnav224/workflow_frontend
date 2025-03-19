import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const apiUrl = "http://localhost:8888/tags";

export const fetchTags = createAsyncThunk("task/fetchTags", async (token) => {
    const { data } = await axios.get(`${apiUrl}/all`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
    return data
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
    }
})


export default taskSlice.reducer;