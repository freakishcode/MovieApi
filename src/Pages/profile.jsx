import { useMemo } from "react";
import { Link } from "react-router-dom";

// JWT decoding library
import jwt from "jwt-decode";

import { useQuery } from "@tanstack/react-query";

// MUI components
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

// API
import { fetchUser } from "../api/PhpApi";

export default function Profile() {
  const token = localStorage.getItem("token");

  // Decode the token only when it changes
  const userToken = useMemo(() => (token ? jwt(token) : null), [token]);

  // Fetch user data using React Query
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUser,
    enabled: !!token,
  });

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      mt={4}
      gap={3}
    >
      <Paper elevation={3} sx={{ p: 4, minWidth: 350 }}>
        <Typography variant='h4' gutterBottom>
          Profile
        </Typography>

        {/* // Display loading, error, or user data */}
        {isLoading && <CircularProgress />}
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            Failed to load user data.
          </Alert>
        )}

        {/* // Display user data from API */}
        {user && (
          <Box mb={2}>
            <Typography>
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography>
              <strong>Last Name:</strong> {user.lastname}
            </Typography>
            <Typography>
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>
          </Box>
        )}

        {/* // Display user data from token */}
        <Typography variant='h5' gutterBottom>
          User from token
        </Typography>
        {userToken && userToken.user && (
          <Box>
            <Typography>
              <strong>Name:</strong> {userToken.user.name}
            </Typography>
            <Typography>
              <strong>Last Name:</strong> {userToken.user.lastname}
            </Typography>
            <Typography>
              <strong>Username:</strong> {userToken.user.username}
            </Typography>
            <Typography>
              <strong>Email:</strong> {userToken.user.email}
            </Typography>
          </Box>
        )}
        <Button
          component={Link}
          to='/'
          variant='contained'
          color='primary'
          sx={{ mt: 3 }}
        >
          Home
        </Button>
      </Paper>
    </Box>
  );
}
