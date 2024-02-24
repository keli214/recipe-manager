var mongoose = require("mongoose");
var Recipe = require("./recipeModel");

const cookbookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a cookbook title"],
    },
    description: {
      type: String,
      default: "Default description",
    },
    recipes: {
      type: Array,
      default: [],
      required: true,
      items: { type: Recipe.schema },
    },
  },
  {
    timestamps: true,
  }
);

const Cookbook = mongoose.model("Cookbook", cookbookSchema);

module.exports = Cookbook;
