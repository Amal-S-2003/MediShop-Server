const categories = require("../model/categorySchema");

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { categoryName, description } = req.body;
    const image = req.file.filename;

    // Check if category already exists
    const existingCategory = await categories.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists!" });
    }

    // Create new category
    const newCategory = new categories({ categoryName, image, description });
    await newCategory.save();

    res.status(201).json({ message: "Category added successfully!", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  console.log("in getAllCategories");

  try {
    const allCategories = await categories.find();
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await categories.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  console.log("in updateCategory");

  try {
    const { categoryName, description } = req.body;
    const image = req.file ? req.file.filename : undefined; // Check if image is provided

    const updateData = { categoryName, description };
    if (image) {
      updateData.image = image;
    }

    const updatedCategory = await categories.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully!", category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  console.log("in deleteCategory");

  try {
    const deletedCategory = await categories.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
