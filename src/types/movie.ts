export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}
export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}
export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string | null;
  homepage: string | null;
  budget?: number;
  revenue?: number;
  status?: string;
  imdb_id?: string | null;
}
