import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";

export const store = configureStore({
  reducer: {
    moviesData: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
