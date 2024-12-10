import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IActiveShifts } from '../../models/dashboard/jobs/getActiveShifts.model';

const initialState: IActiveShifts[] = [
];

const jobActiveShiftSlice = createSlice({
    name: 'activeShifts',
    initialState,
    reducers: {
        getJobActiveShift(state, action: PayloadAction<IActiveShifts[]>) {
            return action.payload;
        },
    },
});

export const jobActiveShiftActions = jobActiveShiftSlice.actions;
export default jobActiveShiftSlice.reducer;
