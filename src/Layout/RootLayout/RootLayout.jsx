import { useState, useContext } from "react";
// CSS
import "./RootLayout.css";

// MUI COMPONENTS
import { Typography, Button, Box } from "@mui/material";

import SwitchBtn from "../../components/SwitchBtn/SwitchBtn";

// Register Modal
import RegisterModal from "../../components/Register/RegisterRequest";
// Login Modal (create this component similar to RegisterModal)
import LoginModal from "../../components/Login/LoginModal";

// REACT ROUTER LINKS
import { Link, NavLink, Outlet } from "react-router-dom";

// REACT ICON FOR TOGGLER AND CANCEL BUTTON
import { FaBars, FaTimes } from "react-icons/fa";

import { ThemeContext } from "../../Context/CreateContextTheme";

function RootLayout() {
  // STATE TO TOGGLE SIDE BAR ICONS
  const [Toggler, setToggler] = useState(false);

  const ShowNavBar = () => setToggler(!Toggler);

  const { theme, toggleTheme } = useContext(ThemeContext);

  // State to control Register Modal
  const [openRegister, setOpenRegister] = useState(false);
  // State to control Login Modal
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <nav className='Navigation'>
        {/* Text nav header */}
        <Link to='/' className='Nav-logo'>
          {/* Title */}
          <Typography
            variant='h4'
            fontWeight='bold'
            gutterBottom
            className='movie-title'
          >
            🎬 Movie App
          </Typography>
        </Link>

        {/* Navigation: NOTE both Route path and link must be the same for it to work  */}
        <ul className={Toggler ? "open-NavBar " : null}>
          <NavLink to='/' onClick={ShowNavBar}>
            Home
          </NavLink>

          <NavLink to='About' onClick={ShowNavBar}>
            About
          </NavLink>

          <NavLink to='Help' onClick={ShowNavBar}>
            Help
          </NavLink>
        </ul>

        {/* theme toggle MUI */}
        <SwitchBtn theme={theme} toggleTheme={toggleTheme} />

        <Box>
          {/* Login Modal Button */}
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 4, mb: 2, mr: 2 }}
            onClick={() => setOpenLogin(true)}
          >
            Login
          </Button>

          {/* Register Modal Button */}
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 4, mb: 2 }}
            onClick={() => setOpenRegister(true)}
          >
            Register
          </Button>

          {/* Hamburger Toggler Button*/}
          <button className='nav-btn' onClick={ShowNavBar}>
            {Toggler ? <FaTimes /> : <FaBars />}
          </button>
        </Box>
      </nav>

      <main>
        {/* Register Modal Component */}
        <RegisterModal
          open={openRegister}
          onClose={() => setOpenRegister(false)}
        />

        {/* Login Modal Component */}
        <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />

        {/* TO DISPLAY WHAT'S INSIDE THE LINKS OR NavLINKS */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
