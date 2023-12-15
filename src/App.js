import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Cookbooks from "./pages/Cookbooks";
import Navbar from "./components/Navbar";
import EditCookbook from "./pages/EditCookbook";
import AddCookbook from "./pages/AddCookbook";
import Cookbook from "./pages/Cookbook";
import Recipe from "./pages/Recipe";
import EditRecipe from "./pages/EditRecipe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookbookProvider } from "./contexts/CookbookContext";
import { RecipeProvider } from "./contexts/RecipeContext";
import { FilterProvider } from "./contexts/FilterContext";

const App = () => {
  return (
    <BrowserRouter>
      <CookbookProvider>
        <RecipeProvider>
          <FilterProvider>
            <Routes>
              <Route path="/" element={<Navbar title="Impasta Rosta" />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="cookbooks" element={<Cookbooks />} />
                <Route path="cookbooks/:cookbookId" element={<Cookbook />} />
                <Route
                  path="cookbooks/:cookbookId/edit"
                  element={<EditCookbook />}
                />
                <Route path="cookbooks/addcookbook" element={<AddCookbook />} />
                <Route path="recipes/:recipeId" element={<Recipe />} />
                <Route
                  path="cookbooks/:cookbookId/recipes/:recipeId"
                  element={<Recipe />}
                />
                <Route
                  path="cookbooks/:cookbookId/recipes/:recipeId/edit"
                  element={<EditRecipe />}
                />
              </Route>
            </Routes>
          </FilterProvider>
        </RecipeProvider>
      </CookbookProvider>
    </BrowserRouter>
  );
};
export default App;
