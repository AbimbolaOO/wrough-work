import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IJobApplications } from '../../models/dashboard/jobs/getAllJobApplications.model';

interface IJobApplicationQuery {
    page: number;
    perPage: number;
    jobData: IJobApplications[];
}

const initialState: IJobApplicationQuery = {
    page: 1,
    perPage: 10,
    jobData: []
};



const jobApplicationsSlice = createSlice({
    name: 'jobApplications',
    initialState,
    reducers: {
        getJobApplications(state, action: PayloadAction<IJobApplicationQuery>) {
            state.page = action.payload.page;
            state.perPage = action.payload.perPage;
            state.jobData = [...action.payload.jobData];
        },
    },
});

export const jobApplicationsActions = jobApplicationsSlice.actions;
export default jobApplicationsSlice.reducer;
