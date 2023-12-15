import Button from "./Button";
import "../styles/RecipeCard.css";
import { useLocation } from "react-router-dom";
import { useCookbook } from "../CookbookContext";
const RecipeCard = ({ recipe }) => {
  const location = useLocation();
  const { deleteRecipe, openFloatingWindow } = useCookbook();
  return (
    <div id="recipe-card-top-level">
      <div
        id="recipe-card"
        style={
          location.pathname.includes("cookbook")
            ? { width: "260px", height: "260px" }
            : undefined
        }
      >
        <img id="recipe-card-image" src={recipe.image} alt="Card"></img>
        <p id="recipe-card-title">{recipe.title}</p>
        <div id="recipe-buttons-container">
        {location.pathname.includes("cookbook") ? (
          <Button
            id="recipe-info-button"
            text="Learn More"
            to={`${location.pathname}/recipes/${recipe.id}`}
          />):(<Button
            id="recipe-info-button"
            text="Learn More"
            to={`/recipes/${recipe.id}`}
          />)}
          <div id="recipe-card-action">
            {location.pathname.includes("cookbook") ? (
              <Button
                id="recipe-card-delete-button"
                icon="trash"
                size={26}
                onClick={() => deleteRecipe(recipe)}
              />
            ) : (
              <Button
                id="recipe-card-add-button"
                icon="add"
                size={30}
                onClick={() => openFloatingWindow(recipe)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
