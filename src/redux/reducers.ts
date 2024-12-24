import activeJobApplicationReducer from './slices/activeJobApplicationsSlice';
import activeShiftsReducer from './slices/activeShiftsSlice';
import authReducer from './slices/authSlice';
import bookmarkedLocumJobsReducer from './slices/bookmarkedLocumJobsSlice';
import jobApplicationsReducer from './slices/jobApplicationsSlice';
import jobsApplicationStatsReducer from './slices/jobApplicationStatsSlice';
import jobsCreatedListReducer from './slices/jobCreatedListSlice';
import locumJobsReducer from './slices/locumJobsSlice';
import locumSingleBookmarkJobReducer from './slices/locumSingleBookmarkJobSlice';
import locumSingleJobReducer from './slices/locumSingleJobSlice';
import verificationReducer from './slices/verificationIdSlice';

export const reducers = {
  auth: authReducer,
  verification: verificationReducer,
  jobsApplicationStats: jobsApplicationStatsReducer,
  jobsCreatedList: jobsCreatedListReducer,
  activeShifts: activeShiftsReducer,
  jobApplications: jobApplicationsReducer,
  activeJobApplications: activeJobApplicationReducer,
  locumJobs: locumJobsReducer,
  locumSingleJobs: locumSingleJobReducer,
  locumSingleBookmarkJobs: locumSingleBookmarkJobReducer,
  bookmarkedLocumJobs: bookmarkedLocumJobsReducer,
};
