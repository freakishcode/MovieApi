import { lazy } from "react";
// CSS
import "./App.css";

// TODO REACT ROUTER (using The NEW React Router method)
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// TODO: CUSTOM THEME CONTEXT COMPONENT
import { ThemeProviderContext } from "./Context/ThemeProviderContext";

// TODO: REACT ROUTER PAGES COMPONENTS
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Layout/AboutLayout/About"));
import Contact from "./Pages/Help/Form";
import MovieList from "./Pages/MovieList";

// TODO: My layouts : TO store Links and NavLinks
import NavBarLayout from "./Layout/RootLayout/RootLayout";

// !! Error Message Routes Component
import NotFound from "./Pages/NotFound/NotFound";

// REACT ROUTER (NEW METHOD: REACT V16.4 upward)
export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<NavBarLayout />}>
      <Route index element={<Home />} />

      {/* Nested Route */}
      <Route path='About' element={<About />}>
        <Route path='Contact' element={<Contact />} />
      </Route>

      <Route path='MovieList' element={<MovieList />} />

      {/* Error page Route if None of the above page is Not found */}
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <ThemeProviderContext>
        {/* WRAPPING THE ROUTER USING THE NEW METHOD */}
        <RouterProvider router={Routers} />
      </ThemeProviderContext>
    </>
  );
}

export default App;
