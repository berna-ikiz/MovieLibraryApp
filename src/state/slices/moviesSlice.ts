import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../utils/type/movieType";

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
    appendMovies: (state, action: PayloadAction<{ movies: MovieType[] }>) => {
      const newMovies = action.payload.movies;
      const existingIds = new Set(state.movies.map((m) => m.id));
      const filteredMovies = newMovies.filter((m) => !existingIds.has(m.id));
      state.movies = [...state.movies, ...filteredMovies];
    },
  },
});

export const { setMovies, appendMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
