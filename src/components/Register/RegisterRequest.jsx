import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
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
  minWidth: 400,
  maxWidth: "95vw",
  outline: "none",
  transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
};

function validateForm({ firstName, lastName, username, email, password }) {
  const errors = {};
  if (!firstName.trim()) errors.firstName = "First Name is required.";
  if (!lastName.trim()) errors.lastName = "Last Name is required.";
  if (!username.trim()) errors.username = "Username is required.";
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())) {
    errors.email = "Email is not valid.";
  }
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
}

export default function RegisterModal({ open, setOpen, onClose }) {
  const FirstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const navigateTo = useNavigate();

  const mutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      navigateTo({ to: `/posts/${data.users.id}` });
    },
    onError: (error) => {
      setGeneralError(
        error?.response?.data?.message ||
          error.message ||
          "Registration unsuccessful."
      );
    },
  });

  const submitHandler = (event) => {
    event.preventDefault();
    setGeneralError("");
    const data = {
      firstName: FirstNameRef.current.value,
      lastName: lastNameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };
    const errors = validateForm(data);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
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

          {/* Show general error (e.g. server error) at the top */}
          {generalError && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {generalError}
            </Alert>
          )}

          <form onSubmit={submitHandler}>
            <Stack spacing={2}>
              <TextField
                inputRef={FirstNameRef}
                label='First Name'
                variant='outlined'
                fullWidth
                autoFocus
                error={!!fieldErrors.firstName}
                helperText={fieldErrors.firstName}
              />
              <TextField
                inputRef={lastNameRef}
                label='Last Name'
                variant='outlined'
                fullWidth
                error={!!fieldErrors.lastName}
                helperText={fieldErrors.lastName}
              />
              <TextField
                inputRef={usernameRef}
                label='Username'
                variant='outlined'
                fullWidth
                error={!!fieldErrors.username}
                helperText={fieldErrors.username}
              />
              <TextField
                inputRef={emailRef}
                label='Email'
                variant='outlined'
                type='email'
                fullWidth
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
              />
              <TextField
                inputRef={passwordRef}
                label='Password'
                variant='outlined'
                type='password'
                fullWidth
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
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
