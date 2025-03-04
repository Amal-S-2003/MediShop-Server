const orders = require("../model/orderSchema");
const carts = require("../model/cartSchema");
const users = require("../model/userSchema");

exports.createOrder = async (req, res) => {
  console.log("in create order function");

  try {
    const {
      products,
      address,
      paymentMethod,
      subtotal,
      shippingFee,
      totalPrice,
      estimatedDelivery,
    } = req.body;
    const userId = req.payload;
    const user = await users.findOne({ _id: userId });
    console.log(user.username);

    const newOrder = new orders({
      userId,
      username:user.username,
      phoneNumber:user.phoneNumber,
      email:user.email,
      products,
      address,
      paymentMethod,
      subtotal,
      shippingFee,
      totalPrice,
      estimatedDelivery,
    });

    const savedOrder = await newOrder.save();
    if (savedOrder) {
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
    const allOrders = await orders.find({ userId });

    res.status(200).json(allOrders);
    console.log(allOrders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

exports.getAllOrders = async (req, res) => {
  console.log("getAllOrders");
  try {
    const allOrders = await orders.find();

    res.status(200).json(allOrders);
    console.log("allOrders", allOrders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

exports.changeDeliveryStatus = async (req, res) => {
  console.log("Processing changeDeliveryStatus request...");
  
  const { orderId, newStatus } = req.body;
  console.log("Order ID:", orderId, "| New Status:", newStatus);

  try {
    const updatedOrder = await orders.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true } // Ensures the response returns the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
    console.log("Updated Order:", updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update delivery status" });
  }
};
