import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocumUserData } from '../../models/auth/signIn.model';

interface IInitialState {
  isAuthenticated: boolean;
  authData?: ILocumUserData | null;
}
const initialState: IInitialState = {
  isAuthenticated: false,
  authData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication(state, action: PayloadAction<IInitialState>) {
      state.authData = action.payload.authData;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    reset: () => initialState,
  },
});

// Selectors
// export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
// export const selectAuthData = (state: RootState) => state.auth.authData;

export const authActions = authSlice.actions;
export default authSlice.reducer;
