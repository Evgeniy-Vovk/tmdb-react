import type { Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <MovieCard onSelect={onSelect} movie={movie} key={movie.id} />
      ))}
    </ul>
  );
};

export default MovieGrid;
