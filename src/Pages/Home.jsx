import { useContext } from "react";

// MUI COMPONENTS
import { Container } from "@mui/material";

import {
  MovieList,
  //  VideosInReact
} from "../components/ExportFiles";

// CONTEXT COMPONENT
import { ThemeContext } from "../Context/CreateContextTheme.jsx";

function Home() {
  // APPLIED THEME TO ALL FILES IN APP BY ID
  const { theme } = useContext(ThemeContext);

  return (
    <div className='App' id={theme}>
      <Container maxWidth='lg'>
        <MovieList />
      </Container>
    </div>
  );
}

export default Home;
