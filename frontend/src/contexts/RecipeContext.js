import { createContext, useReducer, useContext } from "react";
import recipe_img from "../images/pasta.jpg";
const SPOONACULAR_ENABLED = true;
const SPOONACULAR_API_KEY = "83c84ad2b0e4486f93cfbe9658d21c66";
// const SPOONACULAR_API_KEY = "a5cef3ea43e941f0b3a9c1c3af469c26";
const MOCK_RECIPES_ARRAY = {
  results: [
    {
      id: 0,
      title: "title-0",
      image: recipe_img,
    },
    {
      id: 1,
      title: "title-1",
      image: recipe_img,
    },
    {
      id: 2,
      title: "title-2",
      image: recipe_img,
    },
    {
      id: 3,
      title: "title-3",
      image: recipe_img,
    },
    {
      id: 4,
      title: "title-4",
      image: recipe_img,
    },
    {
      id: 5,
      title: "title-5",
      image: recipe_img,
    },
  ],
};
const MOCK_RECIPE_INFO = {
  id: 0,
  title: "title",
  creditsText: "author",
  cuisines: ["cuisine-0", "cuisine-1"],
  readyInMinutes: 10,
  image: recipe_img,
  summary: "description",
  servings: 2,
  extendedIngredients: [
    { amount: 1, unit: "cup", name: "ingredient-0" },
    { amount: 3, unit: "cup", name: "ingredient-1" },
  ],
  analyzedInstructions: [
    { steps: [{ step: "instruction-1" }, { step: "instruction-2" }] },
  ],
};
// Action types
const SET_RECIPES = "SET_RECIPES";
const ADD_RECIPES = "ADD_RECIPES";

// Reducer function
const recipeReducer = (state, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return { ...state, recipesAPI: action.payload };
    case ADD_RECIPES:
      return { ...state, recipesAPI: [...state.recipesAPI, ...action.payload] };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  recipesAPI: [],
};

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const { recipesAPI } = state;

  //Fetch recipes with filters
  const fetchRecipes = async (filtersObj) => {
    console.log(filtersObj);
    let requestUrl =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      SPOONACULAR_API_KEY +
      "&instructionsRequired=true";

    for (const filter in filtersObj) {
      if (filtersObj.hasOwnProperty(filter) && filtersObj[filter] !== "") {
        requestUrl += "&" + filter + "=" + filtersObj[filter];
      }
    }

    const responseData = await makeRequest(requestUrl);
    const responseData_short = responseData.results.map((recipe) => {
      const recipe_short = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      };
      return recipe_short;
    });

    dispatch({ type: SET_RECIPES, payload: responseData_short });
  };

  const fetchRandomRecipes = async (numResults, addMore) => {
    let requestUrl =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
      SPOONACULAR_API_KEY +
      "&instructionsRequired=true&sort=random" +
      "&number=" +
      numResults;

    const responseData = await makeRequest(requestUrl);
    const responseData_short = responseData.results.map(
      ({ id, title, image }) => ({
        id,
        title,
        image,
      })
    );

    addMore
      ? dispatch({ type: ADD_RECIPES, payload: responseData_short })
      : dispatch({ type: SET_RECIPES, payload: responseData_short });
  };

  const fetchRecipe = async (id) => {
    const requestUrl =
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?apiKey=" +
      SPOONACULAR_API_KEY;

    const recipe = await makeRequest(requestUrl);

    const ingredients = recipe.extendedIngredients.map((ingredient) => ({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    }));

    const instructions = recipe.analyzedInstructions[0].steps.map(
      (step) => step.step
    );

    return {
      id: id,
      title: recipe.title,
      author: recipe.creditsText,
      cuisines: recipe.cuisines,
      readyInMinutes: recipe.readyInMinutes,
      image: recipe.image,
      description: recipe.summary,
      servings: recipe.servings,
      ingredients: ingredients,
      instructions: instructions,
    };
  };

  const makeRequest = async (requestUrl) => {
    if (!SPOONACULAR_ENABLED) {
      if (requestUrl.includes("complexSearch")) {
        return MOCK_RECIPES_ARRAY;
      } else {
        return MOCK_RECIPE_INFO;
      }
    }
    try {
      const response = await fetch(requestUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipesAPI,
        fetchRecipes,
        fetchRandomRecipes,
        fetchRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe must be used within a RecipeProvider");
  }
  return context;
};

export { RecipeProvider, useRecipe };
