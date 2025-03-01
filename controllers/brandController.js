const brands = require("../model/brandSchema");

// Add a new brand
exports.addBrand = async (req, res) => {
  try {
    const { brandName,  about } = req.body;
const image=req.file.filename;

    // Check if brand already exists
    const existingBrand = await brands.findOne({ brandName });
    if (existingBrand) {
      return res.status(400).json({ message: "Brand already exists!" });
    }

    // Create new brand
    const newBrand = new brands({ brandName, image, about });
    await newBrand.save();

    res.status(201).json({ message: "Brand added successfully!", brand: newBrand });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all brands
exports.getAllBrands = async (req, res) => {
    console.log("in getAllBrands");
    
  try {
    const allBrands = await brands.find();    
    res.status(200).json(allBrands);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single brand by ID
exports.getBrandById = async (req, res) => {
    
  try {
    const brand = await brands.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a brand
exports.updateBrand = async (req, res) => {
    console.log("in updateBrand");

  try {
    const { brandName, about } = req.body;
    const image=req.file.filename;
console.log(brandName,image, about);

    const updatedBrand = await brands.findByIdAndUpdate(
      req.params.id,
      { brandName, image, about },
      { new: true, runValidators: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand updated successfully!", brand: updatedBrand });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a brand
exports.deleteBrand = async (req, res) => {
    console.log("in deleteBrand");

  try {
    const deletedBrand = await brands.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
