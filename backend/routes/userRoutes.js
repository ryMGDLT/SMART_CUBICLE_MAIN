const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const rateLimit = require("express-rate-limit");
const preventAuthAccess = require("../middleware/preventAuthAccess");
const upload = require("../utils/multerConfig");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 requests per IP
  message: "Too many requests from this IP. Please try again later.",
});

// Public routes
router.post("/login", authLimiter, preventAuthAccess, userController.loginUser);
router.post("/signup", authLimiter, preventAuthAccess, userController.createUser);
router.post("/verify-email", preventAuthAccess, userController.verifyEmail);
router.post("/resend-verification-email", preventAuthAccess, userController.resendVerificationEmail);

// Protected routes
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.patch("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.put("/:id/accept", authMiddleware, userController.acceptUser);
router.put("/:id/decline", authMiddleware, userController.declineUser);
router.post("/:id/upload-profile-image", authMiddleware, upload.single("profileImage"), userController.uploadProfileImage);
router.post("/:id/change-password", authMiddleware, userController.changePassword);

module.exports = router;