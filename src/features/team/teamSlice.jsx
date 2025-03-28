import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_URL}/team`;

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

export const fetchTeamById  = createAsyncThunk("team/fetchTeamById", async (teamId, {rejectWithValue}) => {
    try {
    const {data} = await axios.get(`${apiUrl}/${teamId}`)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})

export const addNewMemberAsync = createAsyncThunk("team/addMemberAsync", async ({teamId, newMember}, {rejectWithValue}) => {
    try {
        console.log(newMember)
        const {data} = await axios.put(`${apiUrl}/${teamId}`, newMember );
            return data;
    } catch (error) {
    return rejectWithValue(error.response.data.error)
    }
})

export const teamSlice = createSlice({
    name:"team",
    initialState:{
        status:"idle",
        error:null,
        teams:[],
        team:{}
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
        builder.addCase(fetchTeamById.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchTeamById.fulfilled, (state , action) => {
            state.status = 'success';
            state.team = action.payload
            state.error =''
        })
        builder.addCase(fetchTeamById.rejected, (state) => {
            state.status = 'failed';
            state.error = 'failed to get team by Id'
        })
        builder.addCase(addNewMemberAsync.pending, (state) => {
            state.status ='loading'
        })
        builder.addCase(addNewMemberAsync.fulfilled, (state, action) => {
            state.status = 'success';
            state.team = action.payload
        })
        builder.addCase(addNewMemberAsync.rejected, (state) => {
            state.status = 'failed';
            state.error = 'failed to add new team member'
        })
    }
})

export default teamSlice.reducer;