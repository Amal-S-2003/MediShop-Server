const multer = require("multer");
const path = require("path");

// ✅ Set Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/blogs/"); // Change destination as needed
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// ✅ File Type Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4", "video/mpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed!"), false);
  }
};

// ✅ Upload Middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit: 10MB
});

module.exports = upload;
