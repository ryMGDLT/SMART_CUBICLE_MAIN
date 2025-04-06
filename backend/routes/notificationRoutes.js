const express = require("express");
const router = express.Router();
const getNotificationModels = require("../models/notification");
const jwt = require("jsonwebtoken");

const verifyTokenAndRole = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    if (decoded.role !== "Admin" && decoded.role !== "Superadmin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  });
};

// Fetch notifications
router.get("/", verifyTokenAndRole, async (req, res) => {
  const { NotificationAtlas } = getNotificationModels();
  try {
    const userId = req.user.id;
    console.log("Fetching notifications for userId:", userId);

    const atlasNotifications = await NotificationAtlas.find({ recipientId: userId })
      .sort({ createdAt: -1 })
      .limit(10);

    console.log("Sending notifications:", atlasNotifications);
    res.json(atlasNotifications);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
});

// Mark notifications as read
router.post("/mark-read", verifyTokenAndRole, async (req, res) => {
  const { NotificationAtlas } = getNotificationModels();
  try {
    const userId = req.user.id;
    await NotificationAtlas.updateMany({ recipientId: userId, read: false }, { read: true });
    console.log(`Notifications marked as read for userId: ${userId}`);
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error.message);
    res.status(500).json({ message: "Error marking notifications", error: error.message });
  }
});

// Clear notifications
router.delete("/clear", verifyTokenAndRole, async (req, res) => {
  const { NotificationAtlas } = getNotificationModels();
  try {
    const userId = req.user.id;
    await NotificationAtlas.deleteMany({ recipientId: userId });
    console.log(`Notifications cleared for userId: ${userId}`);
    res.json({ message: "Notifications cleared" });
  } catch (error) {
    console.error("Error clearing notifications:", error.message);
    res.status(500).json({ message: "Error clearing notifications", error: error.message });
  }
});

// Toggle read status for a single notification
router.patch("/:id/toggle-read", verifyTokenAndRole, async (req, res) => {
  const { NotificationAtlas } = getNotificationModels();
  const { id } = req.params;
  const { read } = req.body;

  try {
    const notificationAtlas = await NotificationAtlas.findByIdAndUpdate(id, { read }, { new: true });

    if (!notificationAtlas) {
      return res.status(404).json({ message: "Notification not found" });
    }

    console.log(`Notification ${id} read status toggled to ${read}`);
    res.status(200).json(notificationAtlas);
  } catch (error) {
    console.error("Error toggling notification read status:", error.message);
    res.status(500).json({ message: "Error toggling read status", error: error.message });
  }
});

module.exports = router;