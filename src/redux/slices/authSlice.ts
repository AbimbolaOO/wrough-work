import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocumUserData } from '../../models/auth/signIn.model';

interface IInitialState {
  isAuthenticated: boolean;
  authData?: ILocumUserData | null;
  accountTier?: number;
}
const initialState: IInitialState = {
  isAuthenticated: false,
  authData: null,
  accountTier: 1
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication(state, action: PayloadAction<IInitialState>) {
      state.authData = action.payload.authData;
      state.isAuthenticated = action.payload.isAuthenticated;
      if (action?.payload?.authData) {
        state.accountTier = computeAccountTier(action?.payload?.authData);
      }
    },

    setAuthData(state, action: PayloadAction<ILocumUserData>) {
      state.authData = action.payload;
    },
    reset: () => initialState,
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;


const computeAccountTier = (authData: ILocumUserData | null | undefined) => {
  let computedTier = 1;

  if (authData?.verification)
    computedTier += 1;

  if (authData?.experiences?.length) {
    computedTier += 1;
  }

  return computedTier;
};
