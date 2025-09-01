import "./LoginModal.css";

import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

// MUI COMPONENTS
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import PropTypes from "prop-types";

// React Query & Axios
import { useMutation } from "@tanstack/react-query";

// Zod schema for validation
const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  minWidth: 340,
  maxWidth: "95vw",
  outline: "none",
  transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
};

// API
import { loginRequest } from "../../api/PhpApi";

export default function LoginModal({ open, onClose }) {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // React Query mutation for login
  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (result) => {
      // If login is successful, store the token and close the modal
      if (result.status) {
        localStorage.setItem("token", result.status);
        setSubmitError("");
        onClose();
        navigate("/profile");
      } else {
        setSubmitError("Invalid username or password");
      }
    },
    onError: () => {
      setSubmitError("Login failed. Please try again.");
    },
  });

  const onSubmit = (data) => {
    setSubmitError("");
    mutation.mutate(data);
    reset();
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box sx={modalStyle}>
          <IconButton
            aria-label='close'
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant='h5'
            component='h2'
            align='center'
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              {(submitError || mutation.isError) && (
                <Alert severity='error'>
                  {submitError || "Login failed. Please try again."}
                </Alert>
              )}
              <TextField
                label='Username'
                variant='outlined'
                fullWidth
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                autoComplete='username'
                autoFocus
              />
              <TextField
                label='Password'
                variant='outlined'
                type='password'
                fullWidth
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                autoComplete='current-password'
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={mutation.isLoading || isSubmitting}
                fullWidth
                sx={{ fontWeight: 600 }}
              >
                {mutation.isLoading || isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <Typography align='center' variant='body2'>
                Don't have an account?{" "}
                <Link
                  to='/register'
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>
                {" | "}
                <Link
                  to='/reset'
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    marginLeft: 4,
                  }}
                >
                  Reset Password
                </Link>
              </Typography>
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
