import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { setUser, setLoading, setError } from "../state/slices/authSlice";
import { AppDispatch } from "../state/movieStore";
import { UserInfo } from "../utils/type/authType";
import { getAuthErrorMessage } from "../utils/firebaseAuthErrorMessage";

export const register =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
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

      dispatch(setUser(userInfo));
    } catch (error) {
      console.log("Registration error:", error);
      const message = getAuthErrorMessage(error.code);
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userInfo: UserInfo = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName ?? null,
      };

      dispatch(setUser(userInfo));
    } catch (error) {
      console.error("Login error:", error);
      const message = getAuthErrorMessage(error.code);
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    await signOut(auth);
    dispatch(setUser(null));
  } catch (error) {
    console.error("Logout error:", error);
    const message = getAuthErrorMessage(error.code);
    dispatch(setError(message));
  } finally {
    dispatch(setLoading(false));
  }
};
