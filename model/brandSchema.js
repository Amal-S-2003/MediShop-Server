const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String, // URL or file path to the brand's image
      required: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    productCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
); // Adds createdAt & updatedAt timestamps

const brands = mongoose.model("brands", brandSchema);
module.exports = brands;
