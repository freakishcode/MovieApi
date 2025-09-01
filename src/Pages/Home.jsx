import { useContext } from "react";

// MUI COMPONENTS
import { Container } from "@mui/material";

import {
  MovieList,
  //  VideosInReact
} from "../components/ExportFiles";

// CONTEXT COMPONENT
import { ThemeContext } from "../Context/CreateContextTheme.jsx";

import useDate from "../Utility/UseDate";

function Home() {
  // APPLIED THEME TO ALL FILES IN APP BY ID
  const { theme } = useContext(ThemeContext);

  const { date, time } = useDate();

  return (
    <div className='App' id={theme}>
      <Container maxWidth='lg'>
        <section className='DATE-TIME'>
          <div>{date}</div>
          <div>{time}</div>
        </section>

        <MovieList />
      </Container>
    </div>
  );
}

export default Home;
