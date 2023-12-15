import Button from "./Button";
import { useCookbook } from "../contexts/CookbookContext";
import { useState } from "react";
import "../styles/FloatingWindow.css";
const FloatingWindow = () => {
  const { recipeDB, cookbooks, closeFloatingWindow, addRecipe } = useCookbook();

  const defaultCookbookValue = cookbooks.length > 0 ? cookbooks[0] : {};
  const [selectedCookbook, setSelectedCookbook] =
    useState(defaultCookbookValue);
  const handleCookbookChange = (event) => {
    const selectedCookbook =
      cookbooks.length > 0 ? cookbooks[event.target.selectedIndex] : {};
    // Use an empty object as a fallback if no match is found
    setSelectedCookbook(selectedCookbook);
  };

  return (
    <div className="notification" id="notification">
      <Button
        id="close"
        icon="close"
        size={28}
        onClick={() => closeFloatingWindow()}
      />
      <div className="contents" id="contents">
        <p>Select Cookbook</p>
        <div className="dropdown">
          <select
            name="cookbooks"
            id="cookbooks"
            onChange={handleCookbookChange}
          >
            {cookbooks.length > 0 ? (
              cookbooks.map((cookbook, index) => (
                <option key={index} value={cookbook}>
                  {cookbook.title}
                </option>
              ))
            ) : (
              <option value="No cookbook">No Cookbook</option>
            )}
          </select>
        </div>
      </div>
      {cookbooks.length > 0 && (
        <Button
          id="secondary-button"
          text="Add"
          onClick={() => addRecipe(recipeDB, selectedCookbook)}
        />
      )}
    </div>
  );
};

export default FloatingWindow;
