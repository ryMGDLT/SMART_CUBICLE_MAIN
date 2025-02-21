const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/emailService");
const multer = require("multer");
const path = require("path");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
const isStrongPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Generate verification token
const generateVerificationToken = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// Create user
const createUser = async (req, res) => {
  try {
    const {
      fullName,
      password,
      confirmPassword,
      employeeId,
      contactNumber,
      email,
      role,
    } = req.body;

    console.log("Received signup request:", { fullName, email, role });

    if (
      !fullName ||
      !password ||
      !confirmPassword ||
      !employeeId ||
      !contactNumber ||
      !email ||
      !role
    ) {
      console.error("Missing required fields in signup request.");
      return res.status(400).send("All fields are required");
    }

    // Extract the first word from the full name to use as the username
    const username = fullName.split(" ")[0];
    console.log("Extracted username:", username);

    // Validate email
    if (!isValidEmail(email)) {
      console.error("Invalid email address:", email);
      return res.status(400).send("Invalid email address");
    }

    // Check if passwords match
    if (password.trim() !== confirmPassword.trim()) {
      console.error("Passwords do not match:", { password, confirmPassword });
      return res.status(400).send("Passwords do not match");
    }

    // Check if password is strong enough
    if (!isStrongPassword(password.trim())) {
      console.error("Weak password provided:", password);
      return res.status(400).send("Password is not strong enough.");
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("Email already exists:", email);
      return res.status(400).send("Email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    console.log("Hashed password:", hashedPassword);

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );
    console.log("Generated verification token:", verificationToken);
    console.log("Token expiry time:", verificationTokenExpiresAt);

    const frontendBaseUrl =
      process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const verificationLink = `${frontendBaseUrl}/verify-email?token=${verificationToken}`;
    console.log("Verification link generated:", verificationLink);

    // Create a new user
    const newUser = new User({
      username,
      fullName,
      password: hashedPassword,
      employeeId,
      contactNumber,
      email,
      role,
      verificationToken,
      verificationTokenExpiresAt,
      verified: false,
    });

    console.log("User object before saving:", newUser);
    await newUser.save();
    console.log("User saved successfully:", newUser);

    // Send verification email
    const subject = "Verify Your Email";
    const text = `Hi ${fullName},\n\nPlease verify your email by clicking the following link: ${verificationLink}\n\nThis link will expire at: ${verificationTokenExpiresAt}\n\nBest regards,\nThe Team`;
    await sendEmail(email, subject, text);
    console.log("Verification email sent to:", email);

    res.status(201).json({
      message:
        "User created successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Error during user creation:", error.message);
    res.status(500).send(error.message);
  }
};
//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received email:", email);
    console.log("Received password:", JSON.stringify(password));

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).send("User not found");
    }

    console.log("User found:", user);
    console.log("Provided password:", password.trim());
    console.log("Stored hashed password:", user.password);

    if (!user.verified) {
      console.log("User email not verified:", email);
      return res
        .status(403)
        .send(
          "Email not verified. Please verify your email before logging in."
        );
    }

    if (user.status === "Pending") {
      console.log("User status is pending:", user.status);
      return res
        .status(403)
        .send(
          "Pending approval. Please contact your employer to approve your signup request."
        );
    }

    if (user.status === "Declined") {
      console.log("User status is declined:", user.status);
      return res
        .status(403)
        .send(
          "Your account has been declined. Please contact support for further assistance."
        );
    }

    if (user.status !== "Accepted") {
      console.log("User status is not accepted:", user.status);
      return res.status(403).send("Your account is not accepted yet.");
    }

    const isMatch = await bcrypt.compare(
      password.trim().replace(/\s+/g, ""),
      user.password
    );
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Invalid password for email:", email);
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT token
    const token = generateToken(user);
    console.log("Login successful for email:", email);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        status: user.status,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send(error.message);
  }
};

//verify email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    console.log("Received token for verification:", token);
    if (!token) {
      console.error("No token provided for verification.");
      return res.status(400).send("Token is required");
    }
    // Find and update the user atomically
    const result = await User.findOneAndUpdate(
      {
        verificationToken: token,
        verificationTokenExpiresAt: { $gt: new Date() },
      },
      {
        $set: {
          verified: true,
          verificationToken: undefined,
          verificationTokenExpiresAt: undefined,
        },
      },
      { new: true }
    );
    if (!result) {
      console.error("Invalid or expired token:", token);
      return res.status(400).send("Invalid or expired token");
    }
    console.log("User verified successfully:", result);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error.message);
    res.status(500).send(error.message);
  }
};

// Resend verification email
const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Received request to resend verification email for:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found for email:", email);
      return res.status(404).send("User not found");
    }

    if (user.verified) {
      console.error("Email is already verified for user:", email);
      return res.status(400).send("Email is already verified.");
    }

    const verificationToken = generateVerificationToken();
    const verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );
    console.log("New verification token generated:", verificationToken);
    console.log("Token expiry time:", verificationTokenExpiresAt);

    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = verificationTokenExpiresAt;
    await user.save();
    console.log("User updated with new verification token:", user);

    const frontendBaseUrl =
      process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const verificationLink = `${frontendBaseUrl}/verify-email?token=${verificationToken}`;
    console.log("Verification link generated:", verificationLink);

    const subject = "Verify Your Email";
    const text = `Hi ${user.fullName},\n\nPlease verify your email by clicking the following link: ${verificationLink}\n\nBest regards,\nThe Team`;
    await sendEmail(email, subject, text);
    console.log("Verification email resent to:", email);
    res
      .status(200)
      .json({ message: "Verification email resent successfully." });
  } catch (error) {
    console.error("Error resending verification email:", error.message);
    res.status(500).send(error.message);
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      updateData.password = await bcrypt.hash(password.trim(), 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload profile image
const uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save the file path to the user's profileImage field
    const serverUrl = process.env.BACKEND_URL || "http://localhost:5000";
    user.profileImage = `${serverUrl}/uploads/profile-images/${req.file.filename}`;
    await user.save();

    console.log("Updated user profileImage:", user.profileImage);

    res.status(200).json({ profileImage: user.profileImage });
  } catch (error) {
    console.error("Error uploading profile image:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept user and update role/status
const acceptUser = async (req, res) => {
  const { id } = req.params;
  const { role, status } = req.body;

  console.log("Received request to accept user:", { id, role, status });

  try {
    if (!role || !status) {
      console.error("Missing role or status in request body.");
      return res.status(400).json({ message: "Role and status are required." });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role, status },
      { new: true }
    );

    if (!user) {
      console.error("User not found with _id:", id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated successfully:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Decline a user
const declineUser = async (req, res) => {
  const { id } = req.params;

  console.log("Received request to decline user:", { id });

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { status: "Declined" },
      { new: true }
    );

    if (!user) {
      console.error("User not found with _id:", id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User declined successfully:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error declining user:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Export all functions
module.exports = {
  createUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadProfileImage,
  acceptUser,
  declineUser,
};
