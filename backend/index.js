require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const janitorRoutes = require("./routes/janitorRoutes");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

console.log("SendGrid API Key:", process.env.SENDGRID_API_KEY);
console.log("From Email:", process.env.FROM_EMAIL);

if (
  !process.env.SENDGRID_API_KEY ||
  !process.env.SENDGRID_API_KEY.startsWith("SG.")
) {
  console.error("Invalid SendGrid API Key. Please check your .env file.");
  process.exit(1);
}

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.8:3000"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "uploads/profile-images");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const userId = req.params.userId; // Assuming userId is passed in the URL
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const newFileName = `${userId}-${uniqueSuffix}${fileExtension}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

// Endpoint for uploading profile images
app.post(
  "/users/:userId/upload-profile-image",
  upload.single("profileImage"),
  (req, res) => {
    const userId = req.params.userId;
    const newFileName = req.file.filename;

    // Delete the old image file (if it exists)
    const oldFiles = fs
      .readdirSync(path.join(__dirname, "uploads/profile-images"))
      .filter((file) => file.startsWith(userId) && file !== newFileName);
    oldFiles.forEach((file) => {
      fs.unlinkSync(path.join(__dirname, "uploads/profile-images", file));
    });

    // Construct the absolute URL for the uploaded image
    const serverUrl = process.env.BACKEND_URL || "http://172.20.10.4:5000";
    res.json({
      profileImage: `${serverUrl}/uploads/profile-images/${newFileName}`,
    });
  }
);
// Routes
app.use("/users", userRoutes);
app.use("/api", janitorRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
  console.log(
    `Backend server accessible on the network at http://${getIPAddress()}:${PORT}`
  );
});

// Function to get the server's IP address
function getIPAddress() {
  const interfaces = require("os").networkInterfaces();
  for (const interfaceName in interfaces) {
    const iface = interfaces[interfaceName];
    for (const alias of iface) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "127.0.0.1"; // Fallback to localhost
}
