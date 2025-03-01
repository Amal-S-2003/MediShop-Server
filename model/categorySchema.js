const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String, // URL or file path to the category's image
      required: true,
    },
    description: {
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

const categories = mongoose.model("categories", categorySchema);
module.exports = categories;
