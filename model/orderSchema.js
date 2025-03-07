const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },

    products: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    address: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "gpay", "cod"],
      required: true,
    },
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    estimatedDelivery: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
   
    finalReason: { type: String },
  cancelledOn: { type: Date },
  },
  { timestamps: true }
);

const orders = mongoose.model("orders", OrderSchema);
module.exports = orders;
