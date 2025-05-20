import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import authReducer from "./slices/authSlice";
import favoriteReducer from "./slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    moviesData: moviesReducer,
    auth: authReducer,
    favorites: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
