import React, { createContext, useState, useContext } from "react";

const CookbookContext = createContext();

const CookbookProvider = ({ children }) => {
  const [cookbooks, setCookbooks] = useState([]);
  const [recipeDB, setRecipeDB] = useState({});
  const [isFloatingWindowOpen, setFloatingWindowOpen] = useState(false);

  //Fetch cookbooks
  const fetchCookbooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/cookbooks");
      const data = await res.json();
      setCookbooks(data);
    } catch (error) {
      console.error("Error fetching cookbooks:", error);
    }
  };

  //Fetch cookbook
  const fetchCookbook = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/cookbooks/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching cookbook:", error);
    }
  };

  //Add cookbook
  const addCookbook = async (cookbook) => {
    const res = await fetch(`http://localhost:5000/cookbooks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cookbook),
    });
    const data = await res.json();
    res.status === 200
      ? setCookbooks([...cookbooks, data])
      : alert(`Add cookbook ${cookbook._id} failed`);
  };

  //Delete cookbook
  const deleteCookbook = async (id) => {
    const res = await fetch(`http://localhost:5000/cookbooks/${id}`, {
      method: "DELETE",
    });
    res.status === 200
      ? setCookbooks(cookbooks.filter((cookbook) => cookbook._id !== id))
      : alert(`Error deleting cookbook ${id}`);
  };

  //Edit cookbook
  const editCookbook = async (id, cookbook) => {
    const res = await fetch(`http://localhost:5000/cookbooks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cookbook),
    });
    const data = await res.json();
    res.status === 200
      ? setCookbooks(
          cookbooks.map((original) => (original._id === id ? data : original))
        )
      : alert(`Error editing cookbook ${id}`);
  };

  //Get recipe
  const getRecipe = async (cookbookID, recipeID) => {
    try {
      const cookbook = await fetchCookbook(cookbookID);
      const recipe = cookbook.recipes.find((recipe) => recipe.id === recipeID);
      if (recipe) {
        return recipe;
      } else {
        throw new Error(`Recipe with ID ${recipeID} not found in cookbook.`);
      }
    } catch (error){
      console.error("Error fetching recipe:", error);
    }
  };

  //Add recipe
  const addRecipe = async (newRecipe, cookbook) => {
    const recipeFormated = { ...newRecipe, cookbookID: cookbook._id };
    //check if the recipe already exist
    const recipe = cookbook.recipes.find(
      (recipe) => recipe.id === newRecipe.id
    );
    if (recipe) {
      closeFloatingWindow();
      return recipe;
    }
    const updatedCookbook = {
      ...cookbook,
      recipes: [...cookbook.recipes, recipeFormated],
    };
    await editCookbook(cookbook._id, updatedCookbook);
    closeFloatingWindow();
  };

  //Edit recipe
  const editRecipe = async (editedRecipe, cookbookId) => {
    
    const cookbookToEdit = cookbooks.find((cookbook) => cookbookId === cookbook._id);
    const updatedCookbook = {
      ...cookbookToEdit,
      recipes: cookbookToEdit.recipes.map((recipe) =>
        recipe.id === editedRecipe.id ? editedRecipe : recipe
      ),
    };

    await editCookbook(updatedCookbook._id, updatedCookbook);
  };

  //Delete recipe
  const deleteRecipe = async (deleteRecipe) => {
    // Find the cookbook to update
    const cookbookToUpdate = cookbooks.find(
      (cookbook) => deleteRecipe.cookbookID === cookbook._id
    );
    if (!cookbookToUpdate) {
      console.error("Cookbook not found for deleteRecipe:", deleteRecipe);
      return;
    }

    // Create an updated cookbook object with the recipe removed
    const updatedCookbook = {
      ...cookbookToUpdate,
      recipes: cookbookToUpdate.recipes.filter(
        (recipe) => recipe.id !== deleteRecipe.id
      ),
    };

    // Update the cookbook using the editCookbook function
    await editCookbook(updatedCookbook._id, updatedCookbook);
  };

  const openFloatingWindow = (recipe) => {
    setRecipeDB(recipe);
    setFloatingWindowOpen(true);
  };

  const closeFloatingWindow = () => {
    setFloatingWindowOpen(false);
  };

  return (
    <CookbookContext.Provider
      value={{
        cookbooks,
        addCookbook,
        editCookbook,
        deleteCookbook,
        fetchCookbook,
        fetchCookbooks,
        recipeDB,
        setRecipeDB,
        getRecipe,
        addRecipe,
        editRecipe,
        deleteRecipe,
        isFloatingWindowOpen,
        openFloatingWindow,
        closeFloatingWindow,
      }}
    >
      {children}
    </CookbookContext.Provider>
  );
};

const useCookbook = () => {
  const context = useContext(CookbookContext);
  if (!context) {
    throw new Error("useCookbook must be used within a CookbookProvider");
  }
  return context;
};

export { CookbookProvider, useCookbook };
