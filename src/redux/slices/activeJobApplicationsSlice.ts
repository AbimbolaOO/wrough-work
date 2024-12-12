import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocumJobs } from '../../models/dashboard/jobs/getLocumJobs.model';

interface IJobApplicationQuery {
    page: number;
    perPage: number;
    jobData: ILocumJobs[];
}

const initialState: IJobApplicationQuery = {
    page: 1,
    perPage: 10,
    jobData: []
};



const activeJobApplicationsSlice = createSlice({
    name: 'jobApplications',
    initialState,
    reducers: {
        activeJobApplications(state, action: PayloadAction<IJobApplicationQuery>) {
            state.page = action.payload.page;
            state.perPage = action.payload.perPage;
            state.jobData = [...action.payload.jobData];
        },
    },
});

export const activeJobApplicationsActions = activeJobApplicationsSlice.actions;
export default activeJobApplicationsSlice.reducer;
