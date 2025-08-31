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
import { fetchMovieVideos } from "../api/MovieApi";

import CloseIcon from "@mui/icons-material/Close";

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
      <Card
        sx={{
          width: 360, // fixed width
          height: 350, // fixed height
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          boxShadow: 4,
          backgroundColor: "#f7f6f6dd",
        }}
      >
        <CardMedia
          component='img'
          height='160'
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Typography variant='h6' fontWeight='bold' noWrap sx={{ mb: 1 }}>
            {movie.title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3, // limit overview to 3 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.overview}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
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

export default MovieCard;
