const orders = require("../model/orderSchema");
const carts = require("../model/cartSchema");

exports.createOrder = async (req, res) => {
  try {
    const {  products, address, paymentMethod, subtotal, shippingFee, totalPrice, estimatedDelivery } = req.body;
    const userId = req.payload;

    const newOrder = new orders({
      userId,
      products,
      address,
      paymentMethod,
      subtotal,
      shippingFee,
      totalPrice,
      estimatedDelivery,
    });

    const savedOrder = await newOrder.save();
    if(savedOrder){
        await carts.findOneAndDelete({ userId });
    }
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getOrders = async (req, res) => {
    const userId = req.payload;
    try {
      const allOrders = await orders.find({ userId })
    
      res.status(200).json(allOrders);
      console.log(allOrders);
      
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  };
  