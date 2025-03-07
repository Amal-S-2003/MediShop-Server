const products = require("../Model/productShema");
const categories = require("../model/categorySchema");
const brands = require("../model/brandSchema");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, totalQuantity, brand, category } = req.body;
    const productImage = req.file ? req.file.filename : null;

    // Parse descriptions and specifications safely
    let parsedDescriptions = [];
    let parsedSpecifications = [];

    if (req.body.descriptions) {
      parsedDescriptions = Array.isArray(req.body.descriptions)
        ? req.body.descriptions
        : JSON.parse(req.body.descriptions);
    }

    if (req.body.specifications) {
      parsedSpecifications = Array.isArray(req.body.specifications)
        ? req.body.specifications
        : JSON.parse(req.body.specifications);
    }

    console.log(
      name,
      price,
      totalQuantity,
      parsedDescriptions,
      parsedSpecifications,
      brand,
      category,
      productImage
    );

    // Create and save the new product
    const newProduct = new products({
      name,
      productImage,
      price,
      totalQuantity,
      descriptions: parsedDescriptions,
      specifications: parsedSpecifications,
      brand,
      category,
    });

    await newProduct.save();

    // Update category count
    if (category) {
      console.log("category is present",category);
      
      const result=await categories.findOneAndUpdate({categoryName:category}, { $inc: { productCount: 1 } });
    }

    // Update brand count
    if (brand) {
      console.log("brand is present",brand);

      const result=await brands.findOneAndUpdate({brandName:brand}, { $inc: { productCount: 1 } });
    }

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};
// exports.addProduct = async (req, res) => {
//   try {
//     const { name, price, totalQuantity, brand, category } = req.body;
//     const productImage = req.file ? req.file.filename : null;

//     // Parse descriptions and specifications safely
//     let parsedDescriptions = [];
//     let parsedSpecifications = [];

//     if (req.body.descriptions) {
//       parsedDescriptions = Array.isArray(req.body.descriptions)
//         ? req.body.descriptions
//         : JSON.parse(req.body.descriptions);
//     }

//     if (req.body.specifications) {
//       parsedSpecifications = Array.isArray(req.body.specifications)
//         ? req.body.specifications
//         : JSON.parse(req.body.specifications);
//     }

//     console.log(
//       name,
//       price,
//       totalQuantity,
//       parsedDescriptions,
//       parsedSpecifications,
//       brand,
//       category,
//       productImage
//     );

//     const newProduct = new products({
//       name,
//       productImage,
//       price,
//       totalQuantity,
//       descriptions: parsedDescriptions,
//       specifications: parsedSpecifications,
//       brand,
//       category,
//     });

//     await newProduct.save();
//     res
//       .status(201)
//       .json({ message: "Product added successfully", product: newProduct });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error adding product", error: error.message });
//   }
// };
exports.editProduct = async (req, res) => {
  console.log("Inside edit Product")
  console.log(req.body);
   
  const {
    name,
    price,
    totalQuantity,
    productImage, 
  } = req.body;
  let parsedDescriptions = [];
  let parsedSpecifications = [];
 
  if (req.body.descriptions) {
    parsedDescriptions = Array.isArray(req.body.descriptions)
      ? req.body.descriptions
      : JSON.parse(req.body.descriptions);
  }

  if (req.body.specifications) {
    parsedSpecifications = Array.isArray(req.body.specifications)
      ? req.body.specifications 
      : JSON.parse(req.body.specifications);
  }

  const uploadImage = req.file ? req.file.filename : productImage;
  const { pid } = req.params; 
  console.log("Product ID:", pid);

  try {
    const updateProduct = await products.findByIdAndUpdate(
      { _id: pid },
      {
        name,
        price,
        totalQuantity,
        descriptions: parsedDescriptions,
        specifications: parsedSpecifications,
        productImage: uploadImage,
      },
      { new: true }
    );

    res.status(200).json(updateProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(400)
      .json({ message: "Error updating product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  console.log("inside deleteProduct function");
  const { pid } = req.params;
  try {
    const deleteProduct = await products.findByIdAndDelete({ _id: pid });
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.getAllProducts = async (req, res) => {
  console.log("Inside getAllProducts Function");

  try {
    const allProducts = await products.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(401).json(err);
  }
};

exports.getProductDetails = async (req, res) => {
  console.log("Inside getProductDetails Function");
  const { id } = req.params;

  try {
    const product = await products.find({ _id: id });

    res.status(200).json(product);
  } catch (error) {
    res.status(401).json(err);
  }
};

exports.getAllBrandProducts = async (req, res) => {
  console.log("Inside getAllBrandProducts Function");
  const { brand } = req.params;

  try {
    const allProducts = await products.find({ brand });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(401).json(err);
  }
};

exports.getCategoryProducts = async (req, res) => {
  console.log("Inside getCategoryProducts Function");
  const { category } = req.params;
  console.log(category);

  try {
    const allProducts = await products.find({ category });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(401).json(err);
  }
};

// Search Products
exports.searchProducts = async (req, res) => {
  console.log("Inside searchProducts Function");

  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search products based on name, brand, or category
    const searchResults = await products.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive name match
        // { brand: { $regex: query, $options: "i" } }, // Case-insensitive brand match
        // { category: { $regex: query, $options: "i" } }, // Case-insensitive category match
      ],
    });

    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res
      .status(500)
      .json({ message: "Error fetching search results", error: error.message });
  }
};
