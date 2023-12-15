const Ingredient = ({ ingredient, scale }) => {
  return (
    <div className="ingredient-item">
      <input type="checkbox" className="ingredient-checkbox"></input>
      <label>{`${parseFloat(ingredient.amount) * scale} ${ingredient.unit} ${
        ingredient.name
      }`}</label>
    </div>
  );
};

export default Ingredient;
