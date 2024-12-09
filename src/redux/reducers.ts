import authReducer from './slices/authSlice';
import verificationReducer from './slices/verificationIdSlice';

export const reducers = {
  auth: authReducer,
  verification: verificationReducer,
};
