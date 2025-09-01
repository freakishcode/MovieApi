import "./MovieCard.css";

import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieVideos } from "../../api/MovieApi";
import CloseIcon from "@mui/icons-material/Close";

const MovieCard = ({ movie }) => {
  const [open, setOpen] = useState(false);

  const { data: videos } = useQuery({
    queryKey: ["movieVideos", movie.id],
    queryFn: () => fetchMovieVideos(movie.id),
  });

  const trailer = videos?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );
  const trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : null;

  return (
    <>
      <Card className='movie-card'>
        <CardMedia
          className='movie-card-img'
          component='img'
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent className='movie-card-content'>
          <Typography className='movie-card-title' variant='h6'>
            {movie.title}
          </Typography>
          <Typography className='movie-card-overview' variant='body2'>
            {movie.overview}
          </Typography>
        </CardContent>
        <CardActions className='movie-card-actions'>
          {trailerUrl ? (
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={() => setOpen(true)}
            >
              Watch Trailer
            </Button>
          ) : (
            <Button size='small' disabled>
              No Trailer
            </Button>
          )}
        </CardActions>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className='movie-modal-box'>
          <IconButton
            onClick={() => setOpen(false)}
            className='movie-modal-close'
          >
            <CloseIcon />
          </IconButton>
          {trailerUrl ? (
            <iframe
              className='movie-modal-iframe'
              src={trailerUrl}
              title={movie.title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          ) : (
            <Typography>No Trailer Available</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MovieCard;
