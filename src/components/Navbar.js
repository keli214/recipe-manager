import PropTypes from "prop-types";
import Tab from "./Tab";
import "../styles/Navbar.css";
import { Outlet } from "react-router-dom";
import FloatingWindow from "./FloatingWindow";
import { useCookbook } from "../CookbookContext";
import { useEffect } from "react";
import { useRecipe } from "../RecipeContext";
const Navbar = ({ title }) => {
  const { isFloatingWindowOpen, fetchCookbooks } = useCookbook();
  const { fetchRandomRecipes } = useRecipe();
  // Run when the app is rendered for the first time
  // Need to fetch recipes and fetch cookbook
  useEffect(() => {
    const fetchData = async () => {
      const searchMore = false;
      const NUM_RECIPES = 6;
      await fetchCookbooks();
      await fetchRandomRecipes(NUM_RECIPES, searchMore);
    };
    fetchData();
  }, []);

  return (
    <div>
      <nav id="navbar">
        <section id="navbar-section-left" className="navbar-section">
          <p id="web-app-title">{title}</p>
        </section>
        <section id="navbar-section-right" className="navbar-section">
          <Tab name="home" />
          <p className="navbar-tab-divider">•</p>
          <Tab name="explore" />
          <p className="navbar-tab-divider">•</p>
          <Tab name="cookbooks" />
        </section>
      </nav>
      <Outlet />
      {isFloatingWindowOpen && <FloatingWindow />}
    </div>
  );
};

Navbar.defaultProps = {
  title: "Impasta Rosta",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
