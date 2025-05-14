import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "@env";

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "tr-TR",
  },
});

export const fetchPopularMovies = async (page = 1) => {
  try {
    const { data } = await api.get("/movie/popular", {
      params: { page },
    });
    return {
      movies: data.results,
      totalPage: data.totalPage,
    };
  } catch (error) {
    throw new Error("Couldn't get any film.");
  }
};

export const fetchMovieDetails = async (movieId: Number) => {
  try {
    const { data } = await api.get(`/movie/${movieId}`);
    return {
      movieDetails: data,
    };
  } catch (error) {
    throw new Error("Couldn't get the film details.");
  }
};

export const fetchCastDetails = async (movieId: Number) => {
  try {
    const { data } = await api.get(`/movie/${movieId}/credits`);
    return {
      castData: data.cast,
    };
  } catch (error) {
    throw new Error("Couldn't get the cast details.");
  }
};
