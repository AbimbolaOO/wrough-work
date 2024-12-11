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



const activeJobApplicationsSlice = createSlice({
    name: 'jobApplications',
    initialState,
    reducers: {
        activeJobApplications(state, action: PayloadAction<IJobApplicationQuery>) {
            state.page = action.payload.page;
            state.perPage = action.payload.page;
            state.jobData = action.payload.jobData;
        },
    },
});

export const activeJobApplicationsActions = activeJobApplicationsSlice.actions;
export default activeJobApplicationsSlice.reducer;