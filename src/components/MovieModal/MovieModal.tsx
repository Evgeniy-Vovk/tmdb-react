import { Modal, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../../services/movieService";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movieId: number;
  open: boolean;
  onClose: () => void;
}

function MovieModal({ movieId, open, onClose }: MovieModalProps) {
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetails(movieId),
    enabled: open,
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={css.modalBoxStyle}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {isLoading && (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography>Loading movie details... 🎬</Typography>
          </Box>
        )}

        {isError && (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="error">Error: {error?.message}</Typography>
          </Box>
        )}

        {movie && (
          <>
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : "https://www.logodesignlove.com/wp-content/uploads/2009/12/ghostbusters-logo-on-black.jpg"
              }
              alt={movie.title}
              style={{ width: "100%", display: "block" }}
            />
            <Box sx={{ p: 3 }}>
              {movie.tagline && (
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  "{movie.tagline}"
                </Typography>
              )}
              <Typography variant="h4" component="h2" gutterBottom>
                {movie.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {movie.overview}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <strong>Release:</strong> {movie.release_date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Runtime:</strong> {movie.runtime} minutes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Rating:</strong> {movie.vote_average} / 10
              </Typography>
              {movie.genres.length > 0 && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}
                </Typography>
              )}
              {movie.homepage && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                    Official Website →
                  </a>
                </Typography>
              )}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default MovieModal;
