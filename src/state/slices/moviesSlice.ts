import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../utils/type/movieType";

interface MoviesState {
  movies: MovieType[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    /* setMovies: (state, action: PayloadAction<{ movies: MovieType[] }>) => {
      state.movies = [...state.movies, ...action.payload.movies];
    },*/
    appendMovies: (state, action: PayloadAction<{ movies: MovieType[] }>) => {
      const newMovies = action.payload.movies;
      const existingIds = new Set(state.movies.map((m) => m.id));
      const filteredMovies = newMovies.filter((m) => !existingIds.has(m.id));
      state.movies = [...state.movies, ...filteredMovies];
    },
    clearMovies: (state) => {
      state.movies = [];
    },
  },
});

export const {
  //setMovies,
  appendMovies,
  clearMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
