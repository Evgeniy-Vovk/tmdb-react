import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../types/movie";

function App() {
  const [page, setPage] = useState(1);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: moviesData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", page],
    queryFn: () => fetchMovies(page),
    staleTime: 1000 * 60,
  });

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const modalOpen = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const modalClose = () => {
    setSelectedMovie(null);
  };
  return (
    <>
      {isLoading && <Loader />}
      {isError && <p>{error.message}</p>}
      {moviesData && (
        <Pagination
          count={moviesData.totalPages}
          page={moviesData.page}
          onChange={handleChange}
          size="large"
          color="secondary"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
            marginBottom: 2,
          }}
        />
      )}
      {moviesData && <MovieGrid movies={moviesData.results} onSelect={modalOpen} />}

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={modalClose} />}
    </>
  );
}

export default App;
