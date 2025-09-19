import { Link, useLocation } from "react-router-dom";

// CSS
import "./BreadCrumbs.css";

function BreadCrumbs() {
  const location = useLocation();

  // /About/contact --> About | contact

  let currentLink = [];

  let crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink.push(`/${crumb}`);
      return (
        <div className='crumb' key={crumb}>
          <Link to={currentLink.join("")}>{crumb}</Link>
        </div>
      );
    });

  return <header className='breadcrumbs'>{crumbs}</header>;
}

export default BreadCrumbs;
