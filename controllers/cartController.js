const carts = require("../model/cartSchema");

exports.addToCart = async (req, res) => {
  console.log("Inside addToCart");

  const { _id, name, price, productImage } = req.body;
  const productId = _id;
  console.log(req.body, productId, name, price, productImage);
  const userId = req.payload;
  const quantity = 1;
  try {
    let cart = await carts.findOne({ userId });

    if (!cart) {
      cart = new carts({ userId, products: [], totalPrice: 0 });
      console.log("new cart created", cart);
    }

    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      console.log("existing product");

      existingProduct.quantity += quantity;
    } else {
      console.log("not existing product");
      const cratResult = cart.products.push({
        productId,
        name,
        price,
        quantity,
        productImage,
      });
      console.log(cratResult);
    }

    cart.totalPrice = cart.products.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

exports.getCart = async (req, res) => {
  console.log("Inside getCart");
  const userId = req.payload;

  try {
    const cart = await carts
      .findOne({ userId})
      .populate("products.productId");
    res.status(200).json(cart || { products: [], totalPrice: 0 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

exports.removeFromcart = async (req, res) => {
  console.log("Inside removeFromcart");

  const { productId } = req.body;
  const userId = req.payload;

  try {
    let cart = await carts.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );
    cart.totalPrice = cart.products.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing product", error });
  }
};
