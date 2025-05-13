import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../utils/movieType";

interface MoviesState {
  movies: MovieType[];
}

const initialState: MoviesState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<{ movies: MovieType[] }>) => {
      state.movies = [...state.movies, ...action.payload.movies];
    },
  },
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
