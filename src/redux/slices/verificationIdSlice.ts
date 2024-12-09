import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VerificationState {
  verificationId: string | null;
}

// Retrieve the initial value from localStorage if it exists
const initialVerificationId = localStorage.getItem("verificationId")
  ? JSON.parse(localStorage.getItem("verificationId") as string)
  : null;

const initialState: VerificationState = {
  verificationId: initialVerificationId, // Load from localStorage initially
};

const verificationIdSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setVerificationId: (state, action: PayloadAction<string>) => {
      state.verificationId = action.payload;
      // Also store in localStorage
      localStorage.setItem("verificationId", JSON.stringify(action.payload));
    },
  },
});

export const { setVerificationId } = verificationIdSlice.actions;

export default verificationIdSlice.reducer;

