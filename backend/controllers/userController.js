const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/emailService");
const getUserModels = require("../models/User");
const getJanitorModels = require("../models/Janitor");
const getNotificationModels = require("../models/notification");

const generateToken = (user) => {
  console.log("Generating token for user:", user._id);
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidEmployeeId = (employeeId) => {
  const employeeIdRegex = /^TUPM-\d{2}-\d{4}$/;
  return employeeIdRegex.test(employeeId);
};

const isStrongPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const generateVerificationToken = () => {
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  console.log("Generated verification token:", token);
  return token;
};

const createUser = async (req, res) => {
  try {
    console.log("Received signup request:", req.body);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const { NotificationAtlas } = getNotificationModels();
    const { fullName, password, confirmPassword, employeeId, contactNumber, email, role } = req.body;

    if (!fullName || !password || !confirmPassword || !employeeId || !employeeId.trim() || !contactNumber || !email || !role) {
      console.error("Missing required fields");
      return res.status(400).send("All fields are required");
    }

    const username = fullName.split(" ")[0];
    console.log("Extracted username:", username);

    if (!isValidEmployeeId(employeeId)) {
      console.error("Invalid employeeId format:", employeeId);
      return res.status(400).send("Employee ID must follow the format TUPM-XX-XXXX (e.g., TUPM-21-1234)");
    }

    if (!isValidEmail(email)) {
      console.error("Invalid email address:", email);
      return res.status(400).send("Invalid email address");
    }

    if (password.trim() !== confirmPassword.trim()) {
      console.error("Passwords do not match");
      return res.status(400).send("Passwords do not match");
    }

    if (!isStrongPassword(password.trim())) {
      console.error("Weak password provided");
      return res.status(400).send("Password is not strong enough");
    }

    const existingAtlas = await UserAtlas.findOne({ $or: [{ email }, { employeeId }] });
    if (existingAtlas) {
      console.error("Duplicate email or employeeId:", { email, employeeId });
      return res.status(400).send("Email or Employee ID already exists");
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const verificationToken = generateVerificationToken();
    const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const userId = new mongoose.Types.ObjectId();
    console.log("Generated user _id:", userId.toString());

    const newUserData = {
      _id: userId,
      username,
      fullName,
      password: hashedPassword,
      employeeId: employeeId.trim(),
      contactNumber,
      email,
      role,
      verificationToken,
      verificationTokenExpiresAt,
      verified: false,
      notificationsEnabled: true,
    };

    const newUserAtlas = new UserAtlas(newUserData);
    await newUserAtlas.save();
    console.log("User saved - Atlas:", newUserAtlas._id);

    const admins = await UserAtlas.find({ role: { $in: ["Admin", "Superadmin"] }, notificationsEnabled: true });
    const notificationMessage = `New User ${email} signed up! Go to users page to assign role and accept the user`;
    const notificationPromises = admins.map(async (admin) => {
      const notificationId = new mongoose.Types.ObjectId();
      const notificationData = {
        _id: notificationId,
        message: notificationMessage,
        userId: newUserAtlas._id,
        recipientId: admin._id,
        createdAt: new Date(),
        read: false,
      };

      const existingNotificationAtlas = await NotificationAtlas.findOne({
        message: notificationMessage,
        userId: newUserAtlas._id,
        recipientId: admin._id,
      });

      if (!existingNotificationAtlas) {
        const notificationAtlas = new NotificationAtlas(notificationData);
        return notificationAtlas.save().then(() => console.log(`Notification saved in Atlas with _id: ${notificationId}`));
      }
    });

    await Promise.all(notificationPromises.filter(Boolean));
    console.log("Notifications created for eligible admins for user signup:", newUserAtlas._id);

    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const verificationLink = `${frontendBaseUrl}/verify-email?token=${verificationToken}`;
    const subject = "Verify Your Email";
    const text = `Hi ${fullName},\n\nPlease verify your email by clicking the following link: ${verificationLink}\n\nThis link will expire at: ${verificationTokenExpiresAt}\n\nBest regards,\nThe Team`;
    await sendEmail(email, subject, text);
    console.log("Verification email sent to:", email);

    res.status(201).json({ message: "User created successfully. Please check your email to verify your account." });
  } catch (error) {
    console.error("Error during user creation:", error.message, error.stack);
    if (error.code === 11000) return res.status(400).send("Email or Employee ID already exists");
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("Received login request:", req.body);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const { email, password } = req.body;

    const user = await UserAtlas.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).send("User not found");
    }
    console.log("User found:", user._id);

    if (!user.verified) {
      console.log("User email not verified:", email);
      return res.status(403).send("Email not verified. Please verify your email before logging in.");
    }

    if (user.status === "Pending") {
      console.log("User status is pending:", user.status);
      return res.status(403).send("Pending approval. Please contact your employer to approve your signup request.");
    }

    if (user.status === "Declined") {
      console.log("User status is declined:", user.status);
      return res.status(403).send("Your account has been declined. Please contact support for further assistance.");
    }

    if (user.status !== "Accepted") {
      console.log("User status is not accepted:", user.status);
      return res.status(403).send("Your account is not accepted yet.");
    }

    const isMatch = await bcrypt.compare(password.trim().replace(/\s+/g, ""), user.password);
    if (!isMatch) {
      console.log("Invalid password for email:", email);
      return res.status(401).send("Invalid credentials");
    }

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
        notificationsEnabled: user.notificationsEnabled,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message, error.stack);
    res.status(500).send(error.message);
  }
};

const verifyEmail = async (req, res) => {
  try {
    console.log("Received email verification request:", req.body);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const { token } = req.body;

    if (!token) {
      console.error("No token provided");
      return res.status(400).send("Token is required");
    }

    const userAtlas = await UserAtlas.findOneAndUpdate(
      { verificationToken: token, verificationTokenExpiresAt: { $gt: new Date() } },
      { $set: { verified: true, verificationToken: undefined, verificationTokenExpiresAt: undefined } },
      { new: true }
    );

    if (!userAtlas) {
      console.error("Invalid or expired token:", token);
      return res.status(400).send("Invalid or expired token");
    }

    console.log("User verified successfully:", userAtlas._id);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error.message, error.stack);
    res.status(500).send(error.message);
  }
};

const resendVerificationEmail = async (req, res) => {
  try {
    console.log("Received resend verification email request:", req.body);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const { email } = req.body;

    const userAtlas = await UserAtlas.findOne({ email });
    if (!userAtlas) {
      console.error("User not found for email:", email);
      return res.status(404).send("User not found");
    }

    if (userAtlas.verified) {
      console.error("Email already verified for user:", email);
      return res.status(400).send("Email is already verified.");
    }

    const verificationToken = generateVerificationToken();
    const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await UserAtlas.updateOne({ email }, { verificationToken, verificationTokenExpiresAt });

    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const verificationLink = `${frontendBaseUrl}/verify-email?token=${verificationToken}`;
    const subject = "Verify Your Email";
    const text = `Hi ${userAtlas.fullName},\n\nPlease verify your email by clicking the following link: ${verificationLink}\n\nBest regards,\nThe Team`;
    await sendEmail(email, subject, text);
    console.log("Verification email resent to:", email);

    res.status(200).json({ message: "Verification email resent successfully." });
  } catch (error) {
    console.error("Error resending verification email:", error.message, error.stack);
    res.status(500).send(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    console.log("Fetching all users");
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const users = await UserAtlas.find().select("-password");
    console.log("Users fetched:", users.map(u => u._id));
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message, error.stack);
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    console.log("Fetching user with ID:", req.params.id);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const user = await UserAtlas.findById(req.params.id).select("-password");
    if (!user) {
      console.error("User not found with _id:", req.params.id);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User fetched:", user._id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log("Received update request for user ID:", req.params.id, "with data:", req.body);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const { JanitorAtlas } = getJanitorModels();
    const { password, fullName, employeeId, contactNumber, email, role, status, notificationsEnabled, ...updateData } = req.body;

    const updatedFields = { ...updateData };
    if (password) updatedFields.password = await bcrypt.hash(password.trim(), 10);
    if (fullName) updatedFields.fullName = fullName.trim();
    if (employeeId) {
      if (!isValidEmployeeId(employeeId)) {
        console.error("Invalid employeeId format:", employeeId);
        return res.status(400).send("Employee ID must follow the format TUPM-XX-XXXX (e.g., TUPM-21-1234)");
      }
      updatedFields.employeeId = employeeId.trim();
    }
    if (contactNumber) updatedFields.contactNumber = contactNumber.trim();
    if (email) {
      if (!isValidEmail(email)) {
        console.error("Invalid email address:", email);
        return res.status(400).send("Invalid email address");
      }
      updatedFields.email = email.toLowerCase();
    }
    if (role) updatedFields.role = role;
    if (status) updatedFields.status = status;
    if (notificationsEnabled !== undefined) updatedFields.notificationsEnabled = notificationsEnabled;

    const userAtlas = await UserAtlas.findByIdAndUpdate(req.params.id, updatedFields, { new: true, runValidators: true }).select("-password");

    if (!userAtlas) {
      console.error("User not found with _id:", req.params.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated successfully:", userAtlas._id);
    console.log("Checking janitor sync conditions - Role:", userAtlas.role, "Status:", userAtlas.status, "Verified:", userAtlas.verified);

    if (userAtlas.role === "Janitor" && userAtlas.status === "Accepted" && userAtlas.verified === true) {
      console.log("Janitor sync conditions met for user:", userAtlas._id);

      const janitorId = new mongoose.Types.ObjectId();
      console.log("Generated janitor _id for sync:", janitorId.toString());

      const janitorData = {
        _id: janitorId,
        userId: userAtlas._id,
        basicDetails: {
          image: userAtlas.profileImage || "",
          name: userAtlas.fullName,
          employeeId: userAtlas.employeeId,
          email: userAtlas.email,
          contact: userAtlas.contactNumber,
        },
        schedule: [],
        performanceTrack: [],
        resourceUsage: [],
        logsReport: [],
      };

      console.log("janitorData before save:", JSON.stringify(janitorData, null, 2));

      const existingJanitorAtlas = await JanitorAtlas.findOne({ userId: userAtlas._id });

      if (existingJanitorAtlas) {
        console.log("Existing janitor found - Atlas:", existingJanitorAtlas._id.toString());
        existingJanitorAtlas.basicDetails = janitorData.basicDetails;

        console.log("Attempting to update janitor in Atlas...");
        await existingJanitorAtlas.save().catch(err => {
          throw new Error(`Failed to update janitor in Atlas: ${err.message}`);
        });
        console.log("Janitor updated in Atlas:", existingJanitorAtlas._id.toString());
      } else {
        console.log("No existing janitor found, creating new janitor with consistent _id...");
        console.log("Attempting to sync janitor to Atlas...");
        const janitorAtlas = new JanitorAtlas(janitorData);
        const newJanitorAtlas = await janitorAtlas.save().catch(err => {
          throw new Error(`Failed to save janitor to Atlas: ${err.message}`);
        });
        console.log("Janitor synced to Atlas:", newJanitorAtlas._id.toString());
      }
    } else {
      console.log("Janitor sync conditions not met for user:", userAtlas._id);
    }

    res.status(200).json(userAtlas);
  } catch (error) {
    console.error("Error updating user:", error.message, error.stack);
    if (error.code === 11000) return res.status(400).send("Email or Employee ID already exists");
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    console.log("Upload request received for user ID:", req.params.id, "Headers:", req.headers, "File:", req.file);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const { JanitorAtlas } = getJanitorModels();

    if (!req.file) {
      console.error("No file uploaded in request");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File uploaded successfully:", req.file.filename);

    const userAtlas = await UserAtlas.findById(req.params.id).catch(err => {
      throw new Error(`Failed to fetch UserAtlas: ${err.message}`);
    });
    if (!userAtlas) {
      console.error("User not found in Atlas with _id:", req.params.id);
      return res.status(404).json({ message: "User not found" });
    }

    const serverUrl = process.env.BACKEND_URL || "http://192.168.8.181:5000";
    const profileImagePath = `${serverUrl}/uploads/profile-images/${req.file.filename}`;
    console.log("New profileImagePath:", profileImagePath);

    const updatedUserAtlas = await UserAtlas.findByIdAndUpdate(req.params.id, { profileImage: profileImagePath }, { new: true, runValidators: true }).select("-password");

    if (!updatedUserAtlas) {
      console.error("Update failed for user ID:", req.params.id);
      return res.status(500).json({ message: "Failed to update user in Atlas" });
    }

    console.log("Updated user profileImage:", updatedUserAtlas.profileImage);
    console.log("Checking janitor sync conditions - Role:", updatedUserAtlas.role, "Status:", updatedUserAtlas.status, "Verified:", updatedUserAtlas.verified);

    if (updatedUserAtlas.role === "Janitor" && updatedUserAtlas.status === "Accepted" && updatedUserAtlas.verified === true) {
      console.log("Janitor sync conditions met for user:", updatedUserAtlas._id);

      const janitorId = new mongoose.Types.ObjectId();
      console.log("Generated janitor _id for sync:", janitorId.toString());

      const janitorData = {
        _id: janitorId,
        userId: updatedUserAtlas._id,
        basicDetails: {
          image: updatedUserAtlas.profileImage,
          name: updatedUserAtlas.fullName,
          employeeId: updatedUserAtlas.employeeId,
          email: updatedUserAtlas.email,
          contact: updatedUserAtlas.contactNumber,
        },
        schedule: [],
        performanceTrack: [],
        resourceUsage: [],
        logsReport: [],
      };

      console.log("janitorData before save:", JSON.stringify(janitorData, null, 2));

      const existingJanitorAtlas = await JanitorAtlas.findOne({ userId: updatedUserAtlas._id });

      if (existingJanitorAtlas) {
        console.log("Existing janitor found - Atlas:", existingJanitorAtlas._id.toString());
        existingJanitorAtlas.basicDetails = janitorData.basicDetails;

        console.log("Attempting to update janitor in Atlas...");
        await existingJanitorAtlas.save().catch(err => {
          throw new Error(`Failed to update janitor in Atlas: ${err.message}`);
        });
        console.log("Janitor updated in Atlas:", existingJanitorAtlas._id.toString());
      } else {
        console.log("No existing janitor found, creating new janitor with consistent _id...");
        console.log("Attempting to sync janitor to Atlas...");
        const janitorAtlas = new JanitorAtlas(janitorData);
        const newJanitorAtlas = await janitorAtlas.save().catch(err => {
          throw new Error(`Failed to save janitor to Atlas: ${err.message}`);
        });
        console.log("Janitor synced to Atlas:", newJanitorAtlas._id.toString());
      }
    } else {
      console.log("Janitor sync conditions not met for user:", updatedUserAtlas._id);
    }

    res.status(200).json({ profileImage: updatedUserAtlas.profileImage });
  } catch (error) {
    console.error("Error uploading profile image:", error.message, error.stack);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log("Received delete request for user ID:", req.params.id);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const { JanitorAtlas } = getJanitorModels();

    const userAtlas = await UserAtlas.findByIdAndDelete(req.params.id);

    if (!userAtlas) {
      console.error("User not found with _id:", req.params.id);
      return res.status(404).json({ message: "User not found" });
    }

    await JanitorAtlas.deleteOne({ userId: req.params.id });

    console.log("User deleted successfully:", req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

const acceptUser = async (req, res) => {
  try {
    console.log("Received accept request:", req.params.id, req.body);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const { JanitorAtlas } = getJanitorModels();

    const { role, status } = req.body;
    if (!role || !status) {
      console.error("Missing role or status");
      return res.status(400).json({ message: "Role and status are required." });
    }

    const userAtlas = await UserAtlas.findByIdAndUpdate(req.params.id, { role, status }, { new: true, runValidators: true });

    if (!userAtlas) {
      console.error("User not found with _id:", req.params.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User accepted successfully:", userAtlas._id);
    console.log("Checking janitor sync conditions - Role:", userAtlas.role, "Status:", userAtlas.status, "Verified:", userAtlas.verified);

    if (userAtlas.role === "Janitor" && userAtlas.status === "Accepted" && userAtlas.verified === true) {
      console.log("Janitor sync conditions met for user:", userAtlas._id);

      const janitorId = new mongoose.Types.ObjectId();
      console.log("Generated janitor _id for sync:", janitorId.toString());

      const janitorData = {
        _id: janitorId,
        userId: userAtlas._id,
        basicDetails: {
          image: userAtlas.profileImage || "",
          name: userAtlas.fullName,
          employeeId: userAtlas.employeeId,
          email: userAtlas.email,
          contact: userAtlas.contactNumber,
        },
        schedule: [],
        performanceTrack: [],
        resourceUsage: [],
        logsReport: [],
      };

      console.log("janitorData before save:", JSON.stringify(janitorData, null, 2));

      const existingJanitorAtlas = await JanitorAtlas.findOne({ userId: userAtlas._id });

      if (existingJanitorAtlas) {
        console.log("Existing janitor found - Atlas:", existingJanitorAtlas._id.toString());
        existingJanitorAtlas.basicDetails = janitorData.basicDetails;

        console.log("Attempting to update janitor in Atlas...");
        await existingJanitorAtlas.save().catch(err => {
          throw new Error(`Failed to update janitor in Atlas: ${err.message}`);
        });
        console.log("Janitor updated in Atlas:", existingJanitorAtlas._id.toString());
      } else {
        console.log("No existing janitor found, creating new janitor with consistent _id...");
        console.log("Attempting to sync janitor to Atlas...");
        const janitorAtlas = new JanitorAtlas(janitorData);
        const newJanitorAtlas = await janitorAtlas.save().catch(err => {
          throw new Error(`Failed to save janitor to Atlas: ${err.message}`);
        });
        console.log("Janitor synced to Atlas:", newJanitorAtlas._id.toString());
      }
    } else {
      console.log("Janitor sync conditions not met for user:", userAtlas._id);
    }

    res.status(200).json(userAtlas);
  } catch (error) {
    console.error("Error handling user update:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

const declineUser = async (req, res) => {
  try {
    console.log("Received decline request for user ID:", req.params.id);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();

    const userAtlas = await UserAtlas.findByIdAndUpdate(req.params.id, { status: "Declined" }, { new: true });

    if (!userAtlas) {
      console.error("User not found with _id:", req.params.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User declined successfully:", userAtlas._id);
    res.status(200).json(userAtlas);
  } catch (error) {
    console.error("Error declining user:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    console.log("Received change password request for user ID:", req.params.id);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      console.error("Missing current or new password");
      return res.status(400).send("Current password and new password are required");
    }

    const userAtlas = await UserAtlas.findById(req.params.id);
    if (!userAtlas) {
      console.error("User not found with _id:", req.params.id);
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword.trim(), userAtlas.password);
    if (!isMatch) {
      console.error("Incorrect current password for user:", req.params.id);
      return res.status(401).send("Current password is incorrect");
    }

    if (!isStrongPassword(newPassword.trim())) {
      console.error("Weak new password provided");
      return res.status(400).send("New password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword.trim(), 10);

    const updatedAtlas = await UserAtlas.findByIdAndUpdate(req.params.id, { password: hashedNewPassword }, { new: true }).select("-password");

    if (!updatedAtlas) {
      console.error("Failed to update password for user ID:", req.params.id);
      return res.status(500).send("Failed to update password");
    }

    console.log("Password changed successfully for user:", req.params.id);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error.message, error.stack);
    res.status(500).send(error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    console.log("Received forgot password request:", req.body);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const { email } = req.body;

    if (!email) {
      console.error("Email not provided");
      return res.status(400).send("Email is required");
    }

    const user = await UserAtlas.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(200).json({
        message: "If an account exists with this email, a reset link has been sent.",
      });
    }

    const resetToken = generateVerificationToken();
    const resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await UserAtlas.findByIdAndUpdate(user._id, {
      verificationToken: resetToken,
      verificationTokenExpiresAt: resetTokenExpiresAt,
    });

    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const resetLink = `${frontendBaseUrl}/reset-password?token=${resetToken}`;
    const subject = "Password Reset Request";
    const text = `Hi ${user.fullName},\n\nYou requested a password reset. Click the following link to reset your password: ${resetLink}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe Team`;

    await sendEmail(email, subject, text);
    console.log("Password reset email sent to:", email);

    res.status(200).json({
      message: "If an account exists with this email, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Error in forgot password:", error.message, error.stack);
    res.status(500).send("Failed to process password reset request");
  }
};

const resetPassword = async (req, res) => {
  try {
    console.log("Received reset password request:", req.body);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { UserAtlas } = getUserModels();
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      console.error("Token or new password not provided");
      return res.status(400).send("Token and new password are required");
    }

    if (!isStrongPassword(newPassword)) {
      console.error("Weak password provided");
      return res.status(400).send("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    const userAtlas = await UserAtlas.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: new Date() },
    });

    if (!userAtlas) {
      console.error("Invalid or expired token:", token);
      return res.status(400).send("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserAtlas.findByIdAndUpdate(userAtlas._id, {
      password: hashedPassword,
      verificationToken: null,
      verificationTokenExpiresAt: null,
    });

    console.log("Password reset successfully for user:", userAtlas._id);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error.message, error.stack);
    res.status(500).send("Failed to reset password");
  }
};

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
  changePassword,
  forgotPassword,
  resetPassword,
};