import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Modal,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieVideos } from "../api/MovieApi";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 3,
};

const MovieListItem = ({ movie }) => {
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
      <Card
        sx={{
          display: "flex",
          alignItems: "flex-start",
          mb: 2,
          p: 1,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardMedia
          component='img'
          sx={{ width: 120, height: 180, borderRadius: 2 }}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent>
            <Typography variant='h6' fontWeight='bold'>
              {movie.title}
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              Release Date: {movie.release_date}
            </Typography>
            <Typography variant='body2' color='text.secondary' paragraph>
              {movie.overview}
            </Typography>
          </CardContent>
          <CardActions>
            {trailerUrl ? (
              <Button
                variant='contained'
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
        </Box>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ ...modalStyle, position: "relative" }}>
          {/* Top-right close icon */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {trailerUrl ? (
            <>
              <iframe
                width='100%'
                height='450'
                src={trailerUrl}
                title={movie.title}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                style={{ borderRadius: "8px" }}
              />
            </>
          ) : (
            <Typography>No Trailer Available</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MovieListItem;
