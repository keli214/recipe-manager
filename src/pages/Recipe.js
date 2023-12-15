import { useParams, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { useRecipe } from "../RecipeContext";
import { useCookbook } from "../CookbookContext";
import "../styles/Recipe.css";
import Ingredient from "../components/Ingredient";

const Recipe = () => {
  const { fetchRecipe } = useRecipe();
  const { cookbookId, recipeId } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});
  const location = useLocation();
  const { getRecipe, openFloatingWindow } = useCookbook();

  //fetch the recipe details from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.pathname.includes("cookbook")) {
          const recipeDB = await getRecipe(cookbookId, recipeId);
          setCurrentRecipe(recipeDB);
        } else {
          const recipeFromAPI = await fetchRecipe(recipeId);
          setCurrentRecipe(recipeFromAPI);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchData();
  }, [recipeId, location.pathname, setCurrentRecipe]);

  const navigate = useNavigate();
  const DEFAULT_SCALE = 1;
  const UPPER_LIMIT = 30;
  const LOWER_LIMIT = 1;
  const [scale, setScale] = useState(DEFAULT_SCALE);

  const scaleChange = (increment) => {
    setScale((prevScale) => {
      if (increment) {
        return Math.min(UPPER_LIMIT, prevScale + 1);
      } else {
        return Math.max(LOWER_LIMIT, prevScale - 1);
      }
    });
  };
  return (
    <div id="recipe-container">
      <div id="recipe-header-container">
        <div id="recipe-header">
          <h1 id="recipe-title">{currentRecipe.title}</h1>
          <p id="recipe-author">{currentRecipe.author}</p>
        </div>
        <div id="back-button-container">
          <Button id="back-button" text="Back" onClick={() => navigate(-1)} />
        </div>
      </div>

      <div id="recipe-subheader">
        <div id="recipe-tags">
          <p id="recipe-cuisine" className="recipe-tag-info">
            Cuisine: {currentRecipe.cuisines}
          </p>
          <p id="recipe-ready-in" className="recipe-tag-info">
            Ready In: {currentRecipe.readyInMinutes} min
          </p>
        </div>
        <div id="recipe-action">
          {location.pathname.includes("cookbook") ? (
            <Button
              id="recipe-action-button"
              text="Edit Recipe"
              icon="edit"
              size={28}
              onClick={() => navigate(`${location.pathname}/edit`)}
            />
          ) : (
            <Button
              id="recipe-action-button"
              text="Add Recipe to Cookbook"
              icon="add"
              size={28}
              onClick={() => openFloatingWindow(currentRecipe)}
            />
          )}
        </div>
      </div>

      <div id="recipe-image-container">
        <img
          id="recipe-image"
          src={currentRecipe.image}
          alt="Recipe"
        ></img>
      </div>

      <h2 className="recipe-section-header">Description</h2>

      <p id="recipe-description">{currentRecipe.description}</p>
      <hr className="recipe-horizontal-rule"></hr>

      <div>
        <h2 className="recipe-section-header">Ingredients Checklist</h2>
      </div>

      <div>
        <span id="scale-text">
          Serving Size Multiplier (The default multiplier 1 has a serving size
          of <b>{currentRecipe.servings}</b>):{" "}
        </span>
        <Button
          id="decrease-scale"
          onClick={() => scaleChange(true)}
          icon="angle-up"
        />
        <Button
          id="increase-scale"
          onClick={() => scaleChange(false)}
          icon="angle-down"
        />
        <span id="scale-value">{scale}</span>
      </div>

      <div id="recipe-ingredients-container">
        <section id="recipe-ingredients-section-left">
          {currentRecipe.ingredients && currentRecipe.ingredients.length > 0 ? (
            currentRecipe.ingredients
              .slice(0, Math.ceil(currentRecipe.ingredients.length / 2))
              .map((ingredient, index) => (
                <Ingredient key={index} ingredient={ingredient} scale={scale} />
              ))
          ) : (
            <h1>No Ingredients to show</h1>
          )}
        </section>
        <section id="recipe-ingredients-section-right">
          {currentRecipe.ingredients && currentRecipe.ingredients.length > 0 ? (
            currentRecipe.ingredients
              .slice(Math.ceil(currentRecipe.ingredients.length / 2))
              .map((ingredient, index) => (
                <Ingredient key={index} ingredient={ingredient} scale={scale} />
              ))
          ) : (
            <h1>No Ingredients to show</h1>
          )}
        </section>
      </div>
      <div id="estimate-text">(Scaled amounts are estimates.)</div>
      <hr className="recipe-horizontal-rule"></hr>

      <h2 className="recipe-section-header">Instructions</h2>
      <ol id="instructions-list">
        {currentRecipe.instructions && currentRecipe.instructions.length > 0 ? (
          currentRecipe.instructions.map((instruction, index) => (
            <li key={index} className="instruction-item">
              {instruction}
            </li>
          ))
        ) : (
          <h1>No Instructions to show</h1>
        )}
      </ol>
      <hr className="recipe-horizontal-rule"></hr>
    </div>
  );
};

export default Recipe;
