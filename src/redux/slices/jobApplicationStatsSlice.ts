import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IGetJobApplicationStats } from '../../models/dashboard/jobs/jobApplicationStats.model';

const initialState: IGetJobApplicationStats = {
    SUBMITTED: 0,
    SCREENING: 0,
    INTERVIEW: 0,
    REJECTED: 0,
    ACCEPTED: 0,
};

const jobApplicationStatsSlice = createSlice({
    name: 'jobApplicationStats',
    initialState,
    reducers: {
        jobApplicationStats(state, action: PayloadAction<IGetJobApplicationStats>) {
            return action.payload;
        },
    },
});

export const jobApplicationStatsActions = jobApplicationStatsSlice.actions;
export default jobApplicationStatsSlice.reducer;
