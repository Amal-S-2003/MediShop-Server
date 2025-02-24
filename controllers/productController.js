const products = require("../Model/productShema");
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

    console.log(name, price, totalQuantity, parsedDescriptions, parsedSpecifications, brand, category, productImage);

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
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};



exports.editProduct = async (req, res) => {
  const { name, price, totalQuantity, descriptions, specifications, productImage } = req.body;
  const uploadImage = req.file ? req.file.filename : productImage;
  const { pid } = req.params;
  console.log("Product ID:", pid);

  try {
    // ✅ Parse descriptions & specifications only if they are strings
    const parsedDescriptions = typeof descriptions === "string" ? JSON.parse(descriptions) : descriptions;
    const parsedSpecifications = typeof specifications === "string" ? JSON.parse(specifications) : specifications;

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
    res.status(400).json({ message: "Error updating product", error: error.message });
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

exports.getProductDetails=async(req,res)=>{
  console.log("Inside getProductDetails Function");
  const {id}=req.params;
  console.log("id==>",id);
  
  try {
    const product = await products.find({_id:id});
    console.log(product);
    
    res.status(200).json(product);
  } catch (error) {
    res.status(401).json(err);
  }
}

exports.getAllBrandProducts = async (req, res) => {
  console.log("Inside getAllBrandProducts Function");
  const { brand } = req.params;

  try {
    const allProducts = await products.find({brand});
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(401).json(err);
  }
};