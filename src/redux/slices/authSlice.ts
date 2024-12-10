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

    setAuthData(state, action: PayloadAction<ILocumUserData>) {
      state.authData = action.payload;
    },
    reset: () => initialState,
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
