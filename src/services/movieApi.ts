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
    console.log("data", data);
    return {
      movies: data.results,
      totalPage: data.totalPage,
    };
  } catch (error) {
    console.log("API ERROR DETAILS", error.response?.data);
    throw new Error("Couldn't get any populer film");
  }
};
