import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IGetCreatedJobs } from '../../models/dashboard/jobs/getCreatedJobs.model';

const initialState: IGetCreatedJobs[] = [
];

const jobCreatedListSlice = createSlice({
    name: 'jobsCreatedList',
    initialState,
    reducers: {
        getJobCreatedList(state, action: PayloadAction<IGetCreatedJobs[]>) {
            return action.payload;
        },
    },
});

export const jobCreatedListActions = jobCreatedListSlice.actions;
export default jobCreatedListSlice.reducer;
