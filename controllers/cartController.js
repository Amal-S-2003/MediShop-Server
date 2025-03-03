const carts = require("../model/cartSchema");
// const products=require('../model/productShema')
const products = require("../Model/productShema");

// Get Cart Items
exports.getCart = async (req, res) => {
  const userId = req.payload;
  try {
    const cart = await carts.findOne({ userId }).populate("products.productId");
    if (!cart) {
      return res.status(200).json({ products: [], totalPrice: 0 });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// Add Item to Cart
exports.addToCart = async (req, res) => {
  console.log("inside Addtocart function");

  const userId = req.payload;
  const { productId, quantity } = req.body;

  try {
    let cart = await carts.findOne({ userId });
    const product = await products.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (!cart) {
      cart = new carts({ userId: userId, products: [], totalPrice: 0 });
    }

    const itemIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
        productImage: product.productImage,
      });
    }

    cart.totalPrice = cart.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

// Update Item Quantity
exports.updateCartItem = async (req, res) => {
  console.log("updateCartItem");

  const userId = req.payload;
  const pid = req.params.pid;
  const { quantity } = req.body;  
  console.log(userId,pid,quantity);
  
  try {
    const cart = await carts.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });
console.log(cart.products);

    const item = cart.products.find(
      (p) => p.productId.toString() == pid
    );
    if (!item) return res.status(404).json({ error: "Item not found in cart" });

    item.quantity = quantity;
    cart.totalPrice = cart.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to update item quantity" });
  }
};

// Remove Item from Cart
exports.removeCartItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.payload;
console.log(productId,userId,req.body)
  try {
    const cart = await carts.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );
    cart.totalPrice = cart.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

// Clear Cart
exports.clearCart = async (req, res) => {
  const userId = req.payload;
  const cartId=req.params;
console.log(userId,cartId,"in clearcart function")
  try {
    await carts.findOneAndDelete({ userId });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
