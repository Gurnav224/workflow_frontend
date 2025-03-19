import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import { projectSlice } from "../features/projects/projectSlice";
import { teamSlice } from "../features/team/teamSlice";
import { taskSlice } from "../features/tasks/taskSlice";

const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        project:projectSlice.reducer,
        team:teamSlice.reducer,
        task:taskSlice.reducer
    }
})


export default store;