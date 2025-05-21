import { createSlice, isPending, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteMovieType } from "../../utils/type/movieType";
import { fetchUserFavorites } from "../../services/favoriteService";
import { RootState } from "../movieStore";

interface Favorites {
  favorites: FavoriteMovieType[];
  error: string | null;
}

const initialState: Favorites = {
  favorites: [],
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFavorites.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { setFavorite, addFavorite, removeFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
