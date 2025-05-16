// src/state/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface UserInfo {
  uid: string;
  email: string | null;
  //displayName: string | null;
  //emailVerified: boolean;
  //photoURL: string | null;
  //providerId?: string;
}

interface AuthState {
  currentUser: UserInfo | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
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
