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
    console.log(error);
    throw new Error("Failed to fetch popular movies.");
  }
};

export const fetchMovieDetails = async (movieId: Number) => {
  try {
    const { data } = await api.get(`/movie/${movieId}`);
    return {
      movieDetails: data,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch movie details.");
  }
};

export const fetchCastDetails = async (movieId: Number) => {
  try {
    const { data } = await api.get(`/movie/${movieId}/credits`);
    return {
      castData: data.cast,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch cast details.");
  }
};

export const searchMovies = async (query: string) => {
  try {
    const { data } = await api.get(`/search/movie`, {
      params: { query },
    });
    return data.results;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to search movies.");
  }
};
