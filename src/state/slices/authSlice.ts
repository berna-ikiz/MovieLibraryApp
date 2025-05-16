// src/state/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserInfo } from "../../utils/type/authType";

const initialState: AuthState = {
  currentUser: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInfo | null>) {
      console.log("action.pay", action.payload);
      state.currentUser = action.payload;
    },
    clearUser(state) {
      state.currentUser = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
