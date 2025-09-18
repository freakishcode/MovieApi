import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Popular movies
export const fetchMovies = async (page = 1) => {
  const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, language: "en-US", page },
  });
  return data; // includes results, total_pages
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  if (!query) return { results: [], total_pages: 1 }; // empty search
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, language: "en-US", query, page },
  });
  return data;
};

// Videos/trailers
export const fetchMovieVideos = async (movieId) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
    params: { api_key: API_KEY, language: "en-US" },
  });
  return data.results;
};
