import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../utils/type/movieType";

interface Favorites {
  favorites: MovieType[];
}

const initialState: Favorites = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorite: (state, action: PayloadAction<MovieType[]>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<MovieType>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { setFavorite, addFavorite, removeFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
