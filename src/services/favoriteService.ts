import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FavoriteMovieType,
  GenreType,
  MovieDetailType,
  MovieType,
} from "../utils/type/movieType";

export const fetchUserFavorites = createAsyncThunk<
  FavoriteMovieType[],
  string,
  { rejectValue: string }
>("favorites/fetchUserFavorites", async (userId, { rejectWithValue }) => {
  try {
    const q = query(collection(db, "favorites"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const favorites = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.movieId,
        title: data.title,
        poster_path: data.poster_path,
        genres: data.genres?.split(",") ?? [],
      };
    });
    console.log(favorites);
    return favorites;
  } catch (error) {
    console.error("Firebase fetch error:", error);
    return rejectWithValue("Failed to fetch user favorites.");
  }
});

export const addFavoriteToDb = async (
  userId: string,
  movie: MovieDetailType
) => {
  const docId = `${userId}_${movie.id}`;
  const favRef = doc(db, "favorites", docId);
  await setDoc(favRef, {
    userId,
    title: movie.title,
    movieId: movie.id,
    poster: movie.poster_path,
    genres: movie.genres?.map((g: GenreType) => g.name).join(","),
  });
};

export const removeFavoriteToDb = async (userId: string, movieId: number) => {
  const docId = `${userId}_${movieId}`;
  const favRef = doc(db, "favorites", docId);
  await deleteDoc(favRef);
};
