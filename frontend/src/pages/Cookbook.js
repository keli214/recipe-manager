import "../styles/SingleCookbook.css";
import { useParams, useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { useCookbook } from "../contexts/CookbookContext";

const Cookbook = () => {
  const { cookbooks } = useCookbook();
  const { cookbookId } = useParams();

  const [currCookbook, setCookbook] = useState({});
  const [currRecipes, setRecipes] = useState([]);

  useEffect(() => {
    const cookbookFromServer = cookbooks.filter(
      (cookbook) => cookbook._id === cookbookId
    );
    if (cookbookFromServer.length > 0) {
      setCookbook(cookbookFromServer[0]);
    }
    if (currCookbook && currCookbook.recipes) {
      setRecipes(currCookbook.recipes);
    }
  }, [cookbookId, cookbooks, currCookbook]);

  const navigate = useNavigate();

  if (!currCookbook) {
    return <p1>Cookbook Loading ...</p1>;
  }

  return (
    <div>
      <div className="title-container">
        <h1 className="title">{currCookbook.title}</h1>
      </div>
      <div id="cookbook-header-contrainer">
        <h2 className="recipe-header">Recipes</h2>
        <div id="cookbook-back-button-container">
          <Button
            id="cookbook-back-button"
            text="back"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
      <div className="recipe-container">
        {currRecipes.length > 0 ? (
          currRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} location="cookbook" />
          ))
        ) : (
          <h1>No Recipes</h1>
        )}
      </div>
      <div id="cookbook-add-button">
        <Button
          id="add-recipe"
          text="Add Recipes"
          onClick={() => navigate("/explore")}
        />
      </div>
    </div>
  );
};

export default Cookbook;
