import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocumJobs } from '../../models/dashboard/jobs/getLocumJobs.model';

interface ILocumSingleJobQuery {
    jobId?: string;
    jobData?: ILocumJobs;
}

const initialState: ILocumSingleJobQuery = {
    jobId: undefined,
    jobData: undefined,
};



const locumSingleJobSlice = createSlice({
    name: 'locumJobs',
    initialState,
    reducers: {
        getSingleLocumJobs(state, action: PayloadAction<ILocumSingleJobQuery>) {
            state.jobId = action.payload.jobId;
            state.jobData = action.payload.jobData;
        },
    },
});

export const locumSingleJobsActions = locumSingleJobSlice.actions;
export default locumSingleJobSlice.reducer;
