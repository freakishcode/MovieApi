import { useState, useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import SwitchBtn from "../../components/SwitchBtn/SwitchBtn";
import RegisterModal from "../../components/Register/RegisterRequest";
import LoginModal from "../../components/Login/LoginModal";
import { ThemeContext } from "../../Context/CreateContextTheme";

// CSS
import "./RootLayout.css";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/About" },
  { label: "Help", to: "/Help" },
];

function RootLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      <AppBar position='static' color='default' elevation={2}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 3 } }}>
          {/* Logo & Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant='h4'
                fontWeight='bold'
                sx={{
                  letterSpacing: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontFamily: "Montserrat, sans-serif",
                }}
                className='movie-title'
              >
                🎬 Movie App
              </Typography>
            </Link>
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#1976d2" : "#333",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "1.1rem",
                    borderBottom: isActive ? "2px solid #1976d2" : "none",
                    padding: "6px 0",
                    transition: "color 0.2s",
                  })}
                >
                  {link.label}
                </NavLink>
              ))}

              <SwitchBtn theme={theme} toggleTheme={toggleTheme} />

              <Button
                variant='contained'
                color='primary'
                sx={{ ml: 2 }}
                onClick={() => setOpenLogin(true)}
              >
                Login
              </Button>

              <Button
                variant='outlined'
                color='primary'
                sx={{ ml: 1 }}
                onClick={() => setOpenRegister(true)}
              >
                Register
              </Button>
            </Box>
          )}

          {/* Mobile Nav Hamburger */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SwitchBtn theme={theme} toggleTheme={toggleTheme} />
              <IconButton
                edge='end'
                color='primary'
                aria-label='menu'
                onClick={handleDrawerToggle}
                sx={{ ml: 1 }}
              >
                <MenuIcon fontSize='large' />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { width: 260, bgcolor: "background.default" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center all drawer items horizontally
            gap: 1,
          }}
        >
          {navLinks.map((link) => (
            <ListItem
              key={link.to}
              disablePadding
              sx={{ width: "100%", justifyContent: "center" }}
            >
              <ListItemButton
                component={NavLink}
                to={link.to}
                onClick={handleDrawerToggle}
                sx={{
                  justifyContent: "center",
                  "&.active .MuiListItemText-primary": {
                    color: "#1976d2",
                    fontWeight: 700,
                  },
                }}
              >
                <ListItemText
                  primary={link.label}
                  sx={{ textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem
            disablePadding
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <ListItemButton
              onClick={() => {
                setOpenLogin(true);
                setDrawerOpen(false);
              }}
              sx={{
                justifyContent: "center",
              }}
            >
              <ListItemText primary='Login' sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <ListItemButton
              onClick={() => {
                setOpenRegister(true);
                setDrawerOpen(false);
              }}
              sx={{
                justifyContent: "center",
              }}
            >
              <ListItemText primary='Register' sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <main>
        <RegisterModal
          open={openRegister}
          onClose={() => setOpenRegister(false)}
          setOpen={setOpenRegister}
        />
        <LoginModal
          open={openLogin}
          onClose={() => setOpenLogin(false)}
          setOpen={setOpenLogin}
        />
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
