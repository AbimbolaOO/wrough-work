import activeJobApplicationReducer from './slices/activeJobApplicationsSlice';
import activeShiftsReducer from './slices/activeShiftsSlice';
import authReducer from './slices/authSlice';
import jobApplicationsReducer from './slices/jobApplicationsSlice';
import jobsApplicationStatsReducer from './slices/jobApplicationStatsSlice';
import jobsCreatedListReducer from './slices/jobCreatedListSlice';
import verificationReducer from './slices/verificationIdSlice';

export const reducers = {
  auth: authReducer,
  verification: verificationReducer,
  jobsApplicationStats: jobsApplicationStatsReducer,
  jobsCreatedList: jobsCreatedListReducer,
  activeShifts: activeShiftsReducer,
  jobApplications: jobApplicationsReducer,
  activeJobApplications: activeJobApplicationReducer,
};
