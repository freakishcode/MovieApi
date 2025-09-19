import { useContext } from "react";
// REACT ROUTER LINKS
import { Link, Outlet } from "react-router-dom";

import "./About.css";

// NAVIGATION TO RETURN BACK IN A NESTED ROUTE
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";

// CONTEXT COMPONENT
import { ThemeContext } from "../../Context/CreateContextTheme";

function About() {
  // APPLIED THEME TO ALL FILES IN APP BY ID
  const { theme } = useContext(ThemeContext);

  return (
    <div className='help' id={theme}>
      {/* COMPONENT TO SHOW THE LOCATION OF A PAGE ROUTE */}
      <BreadCrumbs />

      <section className='info'>
        Movie Trailer app gives you the best and most popular movie, Anime,
        series genre etc., Do you help or more inquiries about our services? you
        can reach us
        <Link to='Contact'>
          <h4> here: Contact</h4>
        </Link>
      </section>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default About;
