const favourites = require("../model/favouriteSchema");

// ✅ Add to Favourites
exports.addToFavourite = async (req, res) => {
  console.log("addToFavourite");

  try {
    const userId = req.payload;
    const { productId } = req.body;

    // Check if product is already in favourites
    const existingFavourite = await favourites.findOne({ userId, productId });
    if (existingFavourite) {
      return res.status(400).json({ message: "Product already in favourites" });
    }

    // Add to favourites
    const newFavourite = new favourites({ userId, productId });
    await newFavourite.save();

    res
      .status(200)
      .json({ message: "Added to favourites", favourite: newFavourite });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to favourites", error: error.message });
  }
};

// ✅ Remove from Favourites
exports.removeFavourite = async (req, res) => {
  try {
    const userId = req.payload;
    const { productId } = req.params;

    // Remove favourite
    await favourites.findOneAndDelete({ userId, productId });
    res.json({ message: "Removed from favourites" });
  } catch (error) {
    res.status(500).json({
      message: "Error removing from favourites",
      error: error.message,
    });
  }
};

// ✅ Get User's Favourite Products
exports.getUserFavourites = async (req, res) => {
  console.log("getUserFavourites");

  try {
    const userId = req.payload;
    console.log(userId);

    // Fetch user's favourites and populate product details
    const allFavourites = await favourites.find({ userId }).populate("productId");
    res.json(allFavourites);
    console.log(allFavourites);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching favourites", error: error.message });
  }
};
