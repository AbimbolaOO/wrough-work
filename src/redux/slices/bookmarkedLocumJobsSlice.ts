import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBookmarkLocumJobs } from '../../models/dashboard/jobs/getBookmarkedLocumJobs.model';

interface ILocumJobsQuery {
    page: number;
    perPage: number;
    bookmarkJobData: IBookmarkLocumJobs[];
}

const initialState: ILocumJobsQuery = {
    page: 1,
    perPage: 10,
    bookmarkJobData: []
};



const bookmarkedLocumJobsSlice = createSlice({
    name: 'bookmarkedLocumJobs',
    initialState,
    reducers: {
        getBookmarkedLocumJobs(state, action: PayloadAction<ILocumJobsQuery>) {
            state.page = action.payload.page;
            state.perPage = action.payload.perPage;
            state.bookmarkJobData = [...action.payload.bookmarkJobData];
        },
    },
});

export const bookmarkedLocumJobsActions = bookmarkedLocumJobsSlice.actions;
export default bookmarkedLocumJobsSlice.reducer;
