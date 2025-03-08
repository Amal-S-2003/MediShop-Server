const mongoose = require("mongoose");

const FavouriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
});

const favourites= mongoose.model("favourites", FavouriteSchema);
module.exports = favourites;
