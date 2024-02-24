var mongoose = require("mongoose")

const stepSchema = new mongoose.Schema({
  step: String,
});

const ingredientSchema = new mongoose.Schema({
  amount: Number,
  unit: String,
  name: String,
});

const recipeSchema = new mongoose.Schema(
  {
    id:{
      type:Number,
      required: [true, "Please enter a recipe id"],
    },
    title: {
      type: String,
      required: [true, "Please enter a recipe title"],
    },
    image:{
      type: String,
      required: [true, "Please enter a recipe image url"],
    },
    cookbookID: {
      type: String,
      required: [true, "Please add a cookbook id"]
    },
    creditsText: String,
    cuisines: [String],
    readyInMinutes: Number,
    summary: String,
    servings: Number,
    extendedIngredients: [ingredientSchema],
    analyzedInstructions: [
      {
        steps: [stepSchema],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
