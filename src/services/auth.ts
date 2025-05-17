import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "./firebase";
import { UserInfo } from "../utils/type/authType";
import { getAuthErrorMessage } from "../utils/firebaseAuthErrorMessage";
import { FirebaseError } from "firebase/app";

export const register = createAsyncThunk<
  UserInfo,
  { email: string; password: string },
  { rejectValue: string }
>("auth/register", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userInfo: UserInfo = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName ?? null,
    };

    return userInfo;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(getAuthErrorMessage(error.code));
    }
    return rejectWithValue(getAuthErrorMessage("auth/unknown"));
  }
});

export const login = createAsyncThunk<
  UserInfo,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName ?? null,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return thunkAPI.rejectWithValue(getAuthErrorMessage(error.code));
    }
    return thunkAPI.rejectWithValue(getAuthErrorMessage("auth/unknown"));
  }
});
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);
