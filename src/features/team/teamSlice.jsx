import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8888/team";

export const addTeamAsync = createAsyncThunk("team/addTeamAsync", async (team, {rejectWithValue}) => {
    try {
        const { data}  = await axios.post(`${apiUrl}/new`, team);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})

export const fetchTeams = createAsyncThunk("team/fetchTeams", async () => {
    const {data } = await axios.get(`${apiUrl}/all`);
    return data
})


export const teamSlice = createSlice({
    name:"team",
    initialState:{
        status:"idle",
        error:null,
        teams:[]
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(addTeamAsync.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(addTeamAsync.fulfilled, (state, action) => {
            state.status = 'success';
            state.teams = [...state.teams, action.payload]
        })
        builder.addCase(addTeamAsync.rejected, async (state, action) => {
            state.status = 'failed';
            state.error = action.payload
        })
        builder.addCase(fetchTeams.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchTeams.fulfilled, (state, action) => {
            state.status = 'success';
            state.teams = action.payload
        })
        builder.addCase(fetchTeams.rejected, (state) => {
            state.status = 'failed';
            state.error = 'failed to get teams'
        })
    }
})

export default teamSlice.reducer;