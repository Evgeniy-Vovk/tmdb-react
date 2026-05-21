import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

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
    setSelectedMovieId(movie.id);
  };

  const modalClose = () => {
    setSelectedMovieId(null);
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error.message} />}

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

      <MovieModal movieId={selectedMovieId!} open={!!selectedMovieId} onClose={modalClose} />
    </>
  );
}

export default App;
