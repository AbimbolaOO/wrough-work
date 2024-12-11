import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocumJobs } from '../../models/dashboard/jobs/getLocumJobs.model';

interface ILocumJobsQuery {
    page: number;
    perPage: number;
    jobData: ILocumJobs[];
}

const initialState: ILocumJobsQuery = {
    page: 1,
    perPage: 10,
    jobData: []
};



const locumJobsSlice = createSlice({
    name: 'locumJobs',
    initialState,
    reducers: {
        getLocumJobs(state, action: PayloadAction<ILocumJobsQuery>) {
            state.page = action.payload.page;
            state.perPage = action.payload.perPage;
            state.jobData = [...action.payload.jobData];
        },
    },
});

export const locumJobsActions = locumJobsSlice.actions;
export default locumJobsSlice.reducer;
