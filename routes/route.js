const express = require("express");
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const cartController = require("../controllers/cartController");
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

module.exports=router;  