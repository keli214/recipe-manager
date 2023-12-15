import RecipeCard from "../components/RecipeCard";
import "../styles/Home.css";
import home_img from "../images/home-pasta.jpg";
import Button from "../components/Button";
import { useRecipe } from "../RecipeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { recipesAPI, fetchRecipes } = useRecipe();
  const NUM_RECIPES = 4;
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState({ query: "" });

  const handleSearchKeyPress = async (event) => {
    if (event.key === "Enter" && searchValue.query !== "") {
      // Call fetchRecipes with the search value
      fetchRecipes(searchValue)
        .then(() => {
          navigate("/explore");
        })
        .catch((error) => {
          console.log("Error fetching recipes from API:", error);
        });
    }
  };

  return (
    <main>
      <section className="search-section">
        <div className="search-box">
          <p className="search-title">Search for a Recipe</p>
          <input
            type="text"
            id="recipe-search"
            placeholder="Search Recipes"
            value={searchValue.query}
            onChange={(e) => setSearchValue({ query: e.target.value })}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleSearchKeyPress(event);
              }
            }}
          />
        </div>
      </section>
      <section className="image-section">
        <img src={home_img} id="home-img" alt="Pasta" />
        <div className="featured-recipes">Featured Recipes</div>
        <section id="explore">
          {recipesAPI.slice(0, NUM_RECIPES).map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} location="home" />
          ))}
        </section>
        <Button id="explore-button" text="explore" to="/explore" />
      </section>
    </main>
  );
};

export default Home;
