import { useRef } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

// REACT QUERY
import { useMutation } from "@tanstack/react-query";

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
import Fade from "@mui/material/Fade"; // Import Fade for animation

// API
import { registerRequest } from "../../api/PhpApi";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  minWidth: 450,
  maxWidth: "95vw",
  outline: "none",
  transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
};

export default function RegisterModal({ open, setOpen, onClose }) {
  const FirstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: (result) => {
      if (result.status) {
        localStorage.setItem("token", result.status);
        setOpen(false);
        navigate("/confirm");
      }
    },
    onError: (error) => {
      // handle error, e.g. show message
      console.log(error.message);
    },
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      firstName: FirstNameRef.current.value,
      lastName: lastNameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };
    mutation.mutate(data);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
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
            Register
          </Typography>

          <form onSubmit={submitHandler} autoComplete='off'>
            <Stack spacing={2}>
              {mutation.isError && (
                <Alert severity='error'>Registration failed. Try again.</Alert>
              )}
              <TextField
                inputRef={FirstNameRef}
                label='First Name'
                variant='outlined'
                fullWidth
                required
                autoFocus
              />
              <TextField
                inputRef={lastNameRef}
                label='Last Name'
                variant='outlined'
                fullWidth
                required
              />
              <TextField
                inputRef={usernameRef}
                label='Username'
                variant='outlined'
                fullWidth
                required
              />
              <TextField
                inputRef={emailRef}
                label='Email'
                variant='outlined'
                type='email'
                fullWidth
                required
              />
              <TextField
                inputRef={passwordRef}
                label='Password'
                variant='outlined'
                type='password'
                fullWidth
                required
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className='register-btn'
                disabled={mutation.isLoading}
                fullWidth
                sx={{ fontWeight: 600 }}
              >
                Register
              </Button>
              <Typography align='center' variant='body2'>
                Already have an account?{" "}
                <Link
                  to='/login'
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};
