const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    descriptions: {
      type: [String], // Array of strings
      required: true,
    },
    specifications: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const products = mongoose.model("products", productSchema);

module.exports = products;
