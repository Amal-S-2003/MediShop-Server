const express = require("express");
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const cartController = require("../controllers/cartController");
const brandController = require("../controllers/brandController");
const categoryController = require("../controllers/categoryController");
const multerConfig = require("../middleware/multerMiddleWare");
const jwtMiddleWare = require("../middleware/jwtMiddleware");
const router=express.Router()

router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/edit-profile',jwtMiddleWare,userController.editProfile)

router.get('/get-all-users',userController.getAllUsers)

router.get('/get-all-products',productController.getAllProducts)
router.get('/get-product-details/:id',productController.getProductDetails)
router.get('/get-brand-products/:brand',jwtMiddleWare,productController.getAllBrandProducts)
router.get('/get-category-products/:category',jwtMiddleWare,productController.getCategoryProducts)
// Search products route
router.get("/search", productController.searchProducts);

router.post('/add-product',multerConfig.single('productImage'),productController.addProduct)
router.put('/update-product/:pid',jwtMiddleWare,multerConfig.single('productImage'),productController.editProduct)
router.delete('/delete-product/:pid',jwtMiddleWare,productController.deleteProduct)

router.post('/add-to-cart',jwtMiddleWare,cartController.addToCart)
router.get('/get-cartitems',jwtMiddleWare,cartController.getCart)
router.delete('/remove-cartitem',jwtMiddleWare,cartController.removeFromcart)



// Add a new brand
router.post("/add-brand",multerConfig.single('image'), brandController.addBrand);

// Get all brands
router.get("/all-brands", brandController.getAllBrands);

// Get brand details by ID
router.get("/brand-details/:id", brandController.getBrandById);

// Update a brand
router.put("/update-brand/:id",multerConfig.single('image'), brandController.updateBrand);

// Delete a brand
router.delete("/delete-brand/:id", brandController.deleteBrand);


// Add a new category
router.post("/add-category", multerConfig.single("image"), categoryController.addCategory);

// Get all categories
router.get("/all-categories", categoryController.getAllCategories);

// Get category details by ID
router.get("/category-details/:id", categoryController.getCategoryById);

// Update a category
router.put("/update-category/:id", multerConfig.single("image"), categoryController.updateCategory);

// Delete a category
router.delete("/delete-category/:id", categoryController.deleteCategory);

module.exports=router;  