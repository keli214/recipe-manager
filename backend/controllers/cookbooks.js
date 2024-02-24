var Cookbook = require("../models/cookbookModel")

const cookbooks = [];

const createCookbook = async (req, res) => {
  try {
    const cookbook = await Cookbook.create(req.body);
    res.status(200).json(cookbook);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getCookbooks = async (req, res) => {
  try {
    const cookbooks = await Cookbook.find({});
    res.status(200).json(cookbooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCookbook = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCookbook = await Cookbook.findById(id);
    res.status(200).json(foundCookbook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCookbook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, recipes } = req.body;

    // Update the cookbook with the new recipe
    const updatedCookbook = await Cookbook.findByIdAndUpdate(
      id,
      { title, description, recipes },
      { new: true }
    );

    res.status(200).json(updatedCookbook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCookbook = async (req, res) => {
  try {
    const { id } = req.params;
    const cookbook = await Cookbook.findByIdAndDelete(id);
    if(!cookbook){
      return res.status(404).json({message: `Cookbook with the id ${id} not found`})
    }
    res.status(200).json(cookbook);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = { 
  createCookbook, 
  getCookbooks, 
  getCookbook, 
  updateCookbook, 
  deleteCookbook
}
