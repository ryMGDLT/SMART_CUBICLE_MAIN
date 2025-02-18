const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');
const preventAuthAccess = require('../middleware/preventAuthAccess');
const upload = require("../utils/multerConfig");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: 'Too many requests from this IP. Please try again later.',
});

// Public routes
router.post('/login', authLimiter, preventAuthAccess, userController.loginUser); // login
router.post('/signup', authLimiter, preventAuthAccess, userController.createUser); // signup
router.post('/verify-email', preventAuthAccess, userController.verifyEmail); // Verify email route
router.post('/resend-verification-email', preventAuthAccess, userController.resendVerificationEmail); // Resend verification email

// Protected routes (require authentication)
router.get('/', authMiddleware, userController.getAllUsers);      // Fetch all users
router.get('/:id', authMiddleware, userController.getUserById);   // Fetch user by ID
router.put('/:id', authMiddleware, userController.updateUser);    // Update user by ID
router.delete('/:id', authMiddleware, userController.deleteUser); // Delete user by ID

// New route for accepting a user
router.put('/:id/accept', authMiddleware, userController.acceptUser); // Accept user and update role/status
router.put("/:id/decline", authMiddleware, userController.declineUser); //decline user and update status

// Upload profile image
router.post("/:id/upload-profile-image", authMiddleware, upload.single("profileImage"), userController.uploadProfileImage);

module.exports = router;