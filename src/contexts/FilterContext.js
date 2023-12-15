import { createContext, useReducer, useState, useContext } from "react";

const CUISINE_FILTERS = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];
const DIET_FILTERS = [
  "None",
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-vegetarian",
  "Ovo-vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
];
const INTOLERANCE_FILTERS = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat",
];
const MEAL_TYPE_FILTERS = [
  "None",
  "Appetizer",
  "Beverage",
  "Break",
  "Breakfast",
  "Dessert",
  "Drink",
  "Fingerfood",
  "Main Course",
  "Marinade",
  "Salad",
  "Sauce",
  "Side Dish",
  "Snack",
  "Soup",
];

// Action types
const SET_CUISINE_FILTERS = "SET_CUISINE_FILTERS";
const SET_DIET_FILTERS = "SET_DIET_FILTERS";
const SET_MEAL_FILTERS = "SET_MEAL_FILTERS";
const SET_INTOLERANCE_FILTERS = "SET_INTOLERANCE_FILTERS";
const RESET_FILTERS = "RESET_FILTERS";

// Reducer function
const filterReducer = (state, action) => {
  switch (action.type) {
    case SET_CUISINE_FILTERS:
      return { ...state, cuisine: action.payload };
    case SET_DIET_FILTERS:
      return { ...state, diet: action.payload };
    case SET_MEAL_FILTERS:
      return { ...state, meal: action.payload };
    case SET_INTOLERANCE_FILTERS:
      return { ...state, intolerance: action.payload };
    default:
      return state;
  }
};

// Initial state of filters
// 4 Blooean Arrays indicating which filter has been checked
const initialState = {
  cuisine: Array(CUISINE_FILTERS.length).fill(false),
  diet: Array(DIET_FILTERS.length).fill(false),
  meal: Array(MEAL_TYPE_FILTERS.length).fill(false),
  intolerance: Array(INTOLERANCE_FILTERS.length).fill(false),
};

const FilterContext = createContext();
const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const [isCleared, setIsCleared] = useState(false);
  const checkedFilter = state;

  const resetFilters = () => {
    dispatch({ type: RESET_FILTERS });
  };

  const setCheckedFilters = (filters, filtersType) => {
    switch (filtersType) {
      case "cuisine":
        dispatch({ type: SET_CUISINE_FILTERS, payload: filters });
        break;
      case "diet":
        dispatch({ type: SET_DIET_FILTERS, payload: filters });
        break;
      case "meal":
        dispatch({ type: SET_MEAL_FILTERS, payload: filters });
        break;
      case "intolerance":
        dispatch({ type: SET_INTOLERANCE_FILTERS, payload: filters });
        break;
      default:
        break;
    }
  };

  return (
    <FilterContext.Provider
      value={{
        isCleared,
        setIsCleared,
        checkedFilter,
        resetFilters,
        setCheckedFilters,
        CUISINE_FILTERS,
        DIET_FILTERS,
        INTOLERANCE_FILTERS,
        MEAL_TYPE_FILTERS,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useRecipe must be used within a FilterProvider");
  }
  return context;
};

export { FilterProvider, useFilter };
