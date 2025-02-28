const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to User Model
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products", // Reference to Product Model
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Ensures quantity is at least 1
        },
        productImage: {
          type: String, // Image URL
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0, // Will be calculated dynamically
    },
  },
  { timestamps: true }
);

const carts = mongoose.model("carts", cartSchema);

module.exports = carts;
