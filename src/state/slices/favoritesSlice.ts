import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteMovieType } from "../../utils/type/movieType";

interface Favorites {
  favorites: FavoriteMovieType[];
}

const initialState: Favorites = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorite: (state, action: PayloadAction<FavoriteMovieType[]>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<FavoriteMovieType>) => {
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
