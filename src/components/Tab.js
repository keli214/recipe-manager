import "../styles/Navbar.css";
import {Link } from "react-router-dom";

const Tab = ({ name }) => {
  return (
    <Link to={name === "home" ? "/" : `/${name}`} className="navbar-tab">
      {name}
    </Link>
  );
};

export default Tab;
