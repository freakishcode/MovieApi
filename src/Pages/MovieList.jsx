import { useEffect, useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMovies, searchMovies } from "../api/MovieApi";
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MovieCard from "../components/MovieCard/MovieCard";
import MovieListItem from "../components/MovieListItem"; // new component
import SearchBar from "../components/SearchBar/SearchBar.jsx";
// CONTEXT COMPONENT
import { ThemeContext } from "../Context/CreateContextTheme.jsx";

const TMDB_PAGE_CAP = 500;

const MovieList = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid"); // 👈 toggle state
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["movies", { query, page }],
    queryFn: () => (query ? searchMovies(query, page) : fetchMovies(page)),
    keepPreviousData: true,
  });

  const totalPages = Math.min(data?.total_pages ?? 1, TMDB_PAGE_CAP);

  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["movies", { query, page: page + 1 }],
        queryFn: () =>
          query ? searchMovies(query, page + 1) : fetchMovies(page + 1),
      });
    }
  }, [page, query, totalPages, queryClient]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, query]);

  // APPLIED THEME TO ALL FILES IN APP BY ID
  const { theme } = useContext(ThemeContext);

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color='error'>Error fetching movies</Typography>;

  const movies = data?.results ?? [];

  return (
    <Box sx={{ p: 2 }}>
      <SearchBar
        onSearch={(newQuery) => {
          setQuery(newQuery);
          setPage(1);
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant='h5' className='movie-title'>
          {query ? `Results for "${query}"` : "Popular Movies"}
        </Typography>

        {/* Toggle buttons */}
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, newView) => newView && setView(newView)}
          size='small'
          sx={{
            bgcolor: theme.mode === "dark" ? "#222" : "#f5f5f5",
            borderRadius: 2,
            "& .MuiToggleButton-root": {
              color: theme.mode === "dark" ? "#e0e0e0" : "#222",
              borderColor: theme.mode === "dark" ? "#444" : "#ccc",
              "&.Mui-selected": {
                bgcolor: theme.mode === "dark" ? "#1976d2" : "#bbdefb",
                color: theme.mode === "dark" ? "#fff" : "#1976d2",
              },
            },
          }}
        >
          <ToggleButton value='grid'>Grid</ToggleButton>
          <ToggleButton value='list'>List</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Movies */}
      {movies.length === 0 ? (
        <Typography>No movies found.</Typography>
      ) : view === "grid" ? (
        <Grid
          container
          spacing={2}
          justifyContent='center'
          alignItems='stretch'
        >
          {movies.map((movie) => (
            <Grid
              key={movie.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          {movies.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </Box>
      )}

      {/* Pagination */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color='primary'
          shape='rounded'
          siblingCount={1}
          boundaryCount={1}
        />
        {isFetching && <Typography variant='body2'>Loading…</Typography>}
      </Box>
    </Box>
  );
};

export default MovieList;
