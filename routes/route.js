const express = require("express");
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const multerConfig = require("../middleware/multerMiddleWare");
const jwtMiddleWare = require("../middleware/jwtMiddleware");
const router=express.Router()

router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/edit-profile',jwtMiddleWare,userController.editProfile)



router.get('/get-all-products',productController.getAllProducts)
router.get('/get-product-details/:id',productController.getProductDetails)
router.get('/get-brand-products/:brand',jwtMiddleWare,productController.getAllBrandProducts)
router.post('/add-product',multerConfig.single('productImage'),productController.addProduct)
router.post('/edit-product/:pid',jwtMiddleWare,multerConfig.single('productImage'),productController.editProduct)
router.post('/delete-product/:pid',jwtMiddleWare,productController.deleteProduct)

module.exports=router;  