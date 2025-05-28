import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "@env";
import { TMDB_CONFIG } from "../utils/constants/tmdbConfig";

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: TMDB_CONFIG.DEFAULT_LANGUAGE,
  },
});

export const fetchPopularMovies = async (page = 1) => {
  try {
    const { data } = await api.get("/movie/popular", {
      params: { page },
    });
    return {
      movies: data.results,
    };
  } catch (error) {
    console.log(error);
    return null;
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
    return null;
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
    return null;
  }
};

export const searchMovies = async (page: number = 1, query: string) => {
  try {
    const { data } = await api.get(`/search/movie`, {
      params: { query, page },
    });
    return data.results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchGenres = async () => {
  try {
    const { data } = await api.get(`/genre/movie/list`);
    return data.genres;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchMoviesByFilters = async (
  genreIds: string,
  page = 1,
  minRating?: number
) => {
  try {
    const DEFAULT_MAX_RATING = 10;
    const params: any = {
      page,
      sort_by: "popularity.desc",
      "vote_average.lte": DEFAULT_MAX_RATING,
    };
    if (genreIds.length > 0) {
      params.with_genres = genreIds;
    }

    if (minRating !== undefined) {
      params["vote_average.gte"] = minRating;
    }

    const { data } = await api.get("/discover/movie", { params });
    return data.results;
  } catch (error) {
    console.log(error);
    return null;
  }
};
