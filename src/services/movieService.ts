import axios from "axios";
import type { MovieResponse, MovieDetails } from "../types/movie";

const fetchMovies = async (page: number) => {
  const res = await axios.get<MovieResponse>(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );
  return {
    results: res.data.results,
    totalPages: res.data.total_pages,
    page: res.data.page,
  };
};

const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await axios.get<MovieDetails>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );
  return response.data;
};

export { fetchMovies, fetchMovieDetails };
