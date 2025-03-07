const reviews = require("../model/reviewSchema");

// Add a new review
exports.addNewReview=async(req,res)=>{
// router.post("/", async (req, res) => {
  try {
    const { productId, userId, username, rating, comment } = req.body;
    const review = new reviews({ productId, userId, username, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error });
  }
};

// Get all reviews for a product
// router.get("/:productId", async (req, res) => {
  exports.getProductReviews=async(req,res)=>{
    const {productId}=req.params

  try {
    const allreviews = await reviews.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.status(200).json(allreviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

// Get average rating for a product
// router.get("/:productId/average-rating", async (req, res) => {
  exports.getAverageRating = async (req, res) => {
    try {
      const { productId } = req.params;
  
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
  
      // Fetch all reviews for the given product
      const allReviews = await reviews.find({ productId });
  
      if (!allReviews || allReviews.length === 0) {
        return res.json({ averageRating: 0 });
      }
  
      // Calculate total rating
      const totalRating = allReviews.reduce((sum, review) => sum + (review.rating || 0), 0);
      
      // Compute average rating and ensure it's a valid float
      const averageRating = parseFloat((totalRating / allReviews.length).toFixed(1));
  
      res.json({ averageRating });
    } catch (error) {
      console.error("Error calculating average rating:", error);
      res.status(500).json({ message: "Failed to calculate rating", error: error.message });
    }
  };
  
