import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocumJobs } from '../../models/dashboard/jobs/getLocumJobs.model';

interface ILocumSingleJobQuery {
    jobId?: string;
    bookmarkJobData?: ILocumJobs;
}

const initialState: ILocumSingleJobQuery = {
    jobId: undefined,
    bookmarkJobData: undefined,
};



const locumSingleBookmarkJobSlice = createSlice({
    name: 'locumSingleBookmarkJob',
    initialState,
    reducers: {
        getSingleLocumBookmarkJobs(state, action: PayloadAction<ILocumSingleJobQuery>) {
            state.jobId = action.payload.jobId;
            state.bookmarkJobData = action.payload.bookmarkJobData;
        },
    },
});

export const locumSingleBookmarkJobsActions = locumSingleBookmarkJobSlice.actions;
export default locumSingleBookmarkJobSlice.reducer;
