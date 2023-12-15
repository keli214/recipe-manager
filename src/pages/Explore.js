import { useState, useEffect } from "react";
import "../styles/Explore.css";
import Button from "../components/Button";
import RecipeCard from "../components/RecipeCard";
import Filter from "../components/Filter";
import { useRecipe } from "../contexts/RecipeContext";
import { useFilter } from "../contexts/FilterContext";
const Explore = () => {
  const FILTERS = ["cuisine", "diet", "intolerance", "meal"];
  const { recipesAPI, fetchRandomRecipes, fetchRecipes } = useRecipe();
  const {
    checkedFilter,
    resetFilters,
    setIsCleared,
    CUISINE_FILTERS,
    DIET_FILTERS,
    INTOLERANCE_FILTERS,
    MEAL_TYPE_FILTERS,
  } = useFilter();
  const [visibilities, setVisibilities] = useState(
    Array(FILTERS.length).fill(false)
  );
  const NUM_RECIPES = 6;
  const [searchValue, setSearchValue] = useState({});
  const [queryValue, setQuery] = useState("");
  const [numRecipesDisplayed, setNumRecipesDisplayed] = useState(NUM_RECIPES);

  useEffect(() => {
    setSearchValue({});
    constructFilters();
  }, [checkedFilter]);

  const handleSearch = async () => {
    try {
      await fetchRecipes(searchValue);
    } catch (error) {
      console.log("Error fetching recipes from API:", error);
    }
  };
  const handleExploreMore = async () => {
    try {
      const searchMore = true;
      await fetchRandomRecipes(NUM_RECIPES, searchMore);
      setNumRecipesDisplayed(recipesAPI.length);
    } catch (error) {
      console.log("Error fetching recipes from API:", error);
    }
  };
  const handleSearchKeyPress = async (event) => {
    if (event.key === "Enter") {
      constructFilters();
      await handleSearch();
    }
  };
  const handleSearchButtonClick = async () => {
    constructFilters();
    await handleSearch();
  };

  const constructFilters = () => {
    const currSearch = { query: queryValue };
    Object.keys(checkedFilter).forEach((key) => {
      const boolFilter = checkedFilter[key];
      switch (key) {
        case "cuisine":
          currSearch[key] = CUISINE_FILTERS.filter(
            (_, index) => boolFilter[index]
          ).join(",");
          break;
        case "diet":
          currSearch[key] = DIET_FILTERS.filter(
            (_, index) => boolFilter[index]
          ).join("|");
          break;
        case "meal":
          currSearch[key] = MEAL_TYPE_FILTERS.filter(
            (_, index) => boolFilter[index]
          ).join(",");
          break;
        case "intolerance":
          currSearch[key] = INTOLERANCE_FILTERS.filter(
            (_, index) => boolFilter[index]
          ).join(",");
          break;
        default:
      }
    });
    setSearchValue(currSearch);
  };

  return (
    <div id="explore-top-level" className="type-explore">
      <section id="filter-section">
        <p id="filter-by-text">Filter By:</p>
        <p id="note">[+]: click to expand</p>
        {FILTERS.map((filter, index) => (
          <div key={index} className="filter-container">
            <Button
              className="filter-choice"
              icon={visibilities[index]}
              id="clear-filters-button"
              text={filter}
              size={28}
              onClick={() => {
                setVisibilities((prevVisibilities) => {
                  const updatedVisibilities = [...prevVisibilities];
                  updatedVisibilities[index] = !updatedVisibilities[index];
                  return updatedVisibilities;
                });
              }}
            />
            <Filter isVisible={visibilities[index]} filterType={filter} />
          </div>
        ))}
        <Button
          id="apply-filters"
          text="Apply Filters"
          onClick={() => handleSearchButtonClick()}
        />
        <Button
          id="clear-filters-button"
          text="Clear Filters"
          onClick={() => {
            resetFilters();
            setIsCleared(true);
          }}
        />
      </section>

      <section id="display-section">
        <section id="explore-search-section">
          <input
            id="search-bar"
            type="text"
            placeholder="Search Recipes"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyUp={handleSearchKeyPress}
          ></input>
          <Button id="search-button" text="Search" onClick={handleSearch} />
        </section>
        <p id="explore-title-text">Explore Recipes</p>

        <section id="recipe-cards-section">
          {recipesAPI.length > 0 ? (
            recipesAPI
              .slice(0, numRecipesDisplayed)
              .map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} location="home" />
              ))
          ) : (
            <p id="no-results-text">No Results Found</p>
          )}
        </section>
        <div id="load-button-container">
          <Button
            id="load-button"
            text="Explore More"
            onClick={handleExploreMore}
          />
        </div>
      </section>
    </div>
  );
};

export default Explore;
