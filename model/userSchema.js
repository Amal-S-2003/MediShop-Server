const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true,
    deafult:"user"
  },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      productName: {
        type: String,
      },
      productImage: {
        type: String,
      },
      price: {
        type: Number,
      },
      qty: { type: Number, default: 1 },
    },
  ],
});
const users = mongoose.model("users", userSchema);
module.exports = users;
