import "../styles/EditRecipe.css";
import Button from "../components/Button";
import { useCookbook } from "../contexts/CookbookContext";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const EditRecipe = () => {
  const { cookbookId, recipeId } = useParams();
  const { editRecipe, getRecipe } = useCookbook();
  const [currentRecipe, setCurrentRecipe] = useState({});
  const navigate = useNavigate();
  const DEFAULT_INGREDIENT = { amount: 0, unit: "unit", name: "ingredient" };
  const DEFAULT_INSTRUCTION = "Instruction";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeDB = await getRecipe(cookbookId, recipeId);
        setCurrentRecipe(recipeDB);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchData();
  }, [recipeId, setCurrentRecipe]);

  useEffect(() => {
    console.log(currentRecipe);
  }, [currentRecipe]);

  return (
    <div>
      <p id="recipe-form-header">Edit Recipe</p>

      <div id="edit-title-box">
        <div id="edit-title-subheader-container">
          <p className="recipe-form-subheader">Title:</p>
        </div>
        <input
          id="edit-title-input"
          type="text"
          placeholder={currentRecipe.title}
          onChange={(e) =>
            setCurrentRecipe((prevRecipe) => {
              return { ...prevRecipe, title: e.target.value };
            })
          }
        ></input>
      </div>

      <div id="edit-description-box">
        <div id="edit-description-subheader-container">
          <p className="recipe-form-subheader">Description:</p>
        </div>
        <textarea
          id="edit-description-input"
          placeholder={currentRecipe.description}
          onChange={(e) =>
            setCurrentRecipe((prevRecipe) => {
              return { ...prevRecipe, description: e.target.value };
            })
          }
        ></textarea>
      </div>
      <div id="edit-ingredients-box">
        <div id="edit-ingredients-subheader-container">
          <p className="recipe-form-subheader">Ingredients:</p>
        </div>
        <div id="ingredients-list-container">
          {currentRecipe.ingredients && currentRecipe.ingredients.length > 0 ? (
            currentRecipe.ingredients.map((ingredient, index) => (
              <div key={index} className="edit-ingredient-item">
                <input
                  type="number"
                  className="edit-ingredient-amount-input"
                  placeholder={ingredient.amount}
                  onChange={(e) =>
                    setCurrentRecipe((prevRecipe) => {
                      const updatedRecipe = {
                        ...prevRecipe,
                        ingredients: [...prevRecipe.ingredients],
                      };
                      //TODO: check the input type
                      const updatedIngredient = {
                        ...updatedRecipe.ingredients[index],
                        amount: e.target.value,
                      };

                      updatedRecipe.ingredients[index] = updatedIngredient;

                      return updatedRecipe;
                    })
                  }
                />
                <input
                  type="text"
                  className="edit-ingredient-unit-input"
                  placeholder={ingredient.unit}
                  onChange={(e) =>
                    setCurrentRecipe((prevRecipe) => {
                      const updatedRecipe = {
                        ...prevRecipe,
                        ingredients: [...prevRecipe.ingredients],
                      };

                      const updatedIngredient = {
                        ...updatedRecipe.ingredients[index],
                        unit: e.target.value,
                      };

                      updatedRecipe.ingredients[index] = updatedIngredient;

                      return updatedRecipe;
                    })
                  }
                />
                <input
                  type="text"
                  className="edit-ingredient-name-input"
                  placeholder={ingredient.name}
                  onChange={(e) =>
                    setCurrentRecipe((prevRecipe) => {
                      const updatedRecipe = {
                        ...prevRecipe,
                        ingredients: [...prevRecipe.ingredients],
                      };

                      const updatedIngredient = {
                        ...updatedRecipe.ingredients[index],
                        name: e.target.value,
                      };

                      updatedRecipe.ingredients[index] = updatedIngredient;

                      return updatedRecipe;
                    })
                  }
                />
                <Button
                  id="recycle-bin-button"
                  icon="trash"
                  size={26}
                  onClick={() =>
                    setCurrentRecipe((prevRecipe) => {
                      const updatedRecipe = {
                        ...prevRecipe,
                        ingredients: [...prevRecipe.ingredients],
                      };
                      const updatedIngredients =
                        updatedRecipe.ingredients.filter(
                          (ingredient, idx) => idx !== index
                        );
                      updatedRecipe.ingredients = updatedIngredients;
                      return updatedRecipe;
                    })
                  }
                />
              </div>
            ))
          ) : (
            <h3>No Ingredients</h3>
          )}

          <Button
            id="recipe-form-add-button"
            text="Add Ingredient"
            onClick={() =>
              setCurrentRecipe((prevRecipe) => {
                const updatedRecipe = {
                  ...prevRecipe,
                };
                updatedRecipe.ingredients = updatedRecipe.ingredients
                  ? [...updatedRecipe.ingredients, DEFAULT_INGREDIENT]
                  : [DEFAULT_INGREDIENT];
                return updatedRecipe;
              })
            }
          />
        </div>
      </div>

      <div id="edit-instructions-box">
        <div id="edit-instructions-subheader-container">
          <p className="recipe-form-subheader">Instructions:</p>
        </div>

        <div id="instructions-list-container">
          <ol id="edit-instructions-list">
            {currentRecipe.instructions &&
            currentRecipe.instructions.length > 0 ? (
              currentRecipe.instructions.map((instruction, index) => (
                <div key={index} className="edit-instruction-item">
                  <li className="edit-instruction-number"></li>
                  <div className="edit-instruction-content">
                    <textarea
                      className="edit-instruction-input"
                      placeholder={instruction}
                      onChange={(e) =>
                        setCurrentRecipe((prevRecipe) => {
                          const updatedRecipe = {
                            ...prevRecipe,
                            instructions: [...prevRecipe.instructions],
                          };

                          const updatedInstructions =
                            updatedRecipe.instructions;
                          updatedInstructions[index] = e.target.value;
                          updatedRecipe.instructions = updatedInstructions;
                          return updatedRecipe;
                        })
                      }
                    ></textarea>
                    <Button
                      id="recycle-bin-button"
                      icon="trash"
                      size={26}
                      onClick={() =>
                        setCurrentRecipe((prevRecipe) => {
                          const updatedRecipe = {
                            ...prevRecipe,
                            instructions: [...prevRecipe.instructions],
                          };
                          const updatedInstructions =
                            updatedRecipe.instructions.filter(
                              (instruction, idx) => idx !== index
                            );
                          updatedRecipe.instructions = updatedInstructions;
                          return updatedRecipe;
                        })
                      }
                    />
                  </div>
                </div>
              ))
            ) : (
              <h3>No Instructions</h3>
            )}

            <Button
              id="recipe-form-add-button"
              text="Add Instruction"
              onClick={() =>
                setCurrentRecipe((prevRecipe) => {
                  let updatedRecipe = {
                    ...prevRecipe,
                  };
                  if (updatedRecipe.instructions) {
                    const updatedInstructions = [
                      ...updatedRecipe.instructions,
                      DEFAULT_INSTRUCTION,
                    ];
                    updatedRecipe.instructions = updatedInstructions;
                  } else {
                    updatedRecipe = {
                      ...updatedRecipe,
                      instructions: [DEFAULT_INSTRUCTION],
                    };
                  }

                  return updatedRecipe;
                })
              }
            />
          </ol>
        </div>
      </div>
      <div id="recipe-form-save-button-container">
        <Button
          id="recipe-form-save-button"
          text="Save Changes"
          onClick={async () => {
            await editRecipe(currentRecipe, cookbookId);
            navigate(-1);
          }}
        />
      </div>
      <div id="recipe-form-cancel-button-container">
        <Button
          id="recipe-form-cancel-button"
          text="Cancel"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default EditRecipe;
