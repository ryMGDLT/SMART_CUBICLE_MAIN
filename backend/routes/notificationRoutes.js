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


router.get("/", verifyTokenAndRole, async (req, res) => {
  const { NotificationLocal, NotificationAtlas } = getNotificationModels();
  try {
    const userId = req.user.id; // From JWT token
    console.log("Fetching notifications for userId:", userId);

    const [localNotifications, atlasNotifications] = await Promise.all([
      NotificationLocal.find({ recipientId: userId })
        .sort({ createdAt: -1 })
        .limit(10),
      NotificationAtlas.find({ recipientId: userId })
        .sort({ createdAt: -1 })
        .limit(10),
    ]);

    
    const notificationMap = new Map();
    [...localNotifications, ...atlasNotifications].forEach((notification) => {
      notificationMap.set(notification._id.toString(), notification);
    });
    const uniqueNotifications = Array.from(notificationMap.values());

    console.log("Sending unique notifications:", uniqueNotifications);
    res.json(uniqueNotifications);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
});


router.post("/mark-read", verifyTokenAndRole, async (req, res) => {
  const { NotificationLocal, NotificationAtlas } = getNotificationModels();
  try {
    const userId = req.user.id;
    await Promise.all([
      NotificationLocal.updateMany(
        { recipientId: userId, read: false },
        { read: true }
      ),
      NotificationAtlas.updateMany(
        { recipientId: userId, read: false },
        { read: true }
      ),
    ]);
    console.log(`Notifications marked as read for userId: ${userId}`);
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error.message);
    res.status(500).json({ message: "Error marking notifications", error: error.message });
  }
});


router.delete("/clear", verifyTokenAndRole, async (req, res) => {
  const { NotificationLocal, NotificationAtlas } = getNotificationModels();
  try {
    const userId = req.user.id;
    await Promise.all([
      NotificationLocal.deleteMany({ recipientId: userId }),
      NotificationAtlas.deleteMany({ recipientId: userId }),
    ]);
    console.log(`Notifications cleared for userId: ${userId}`);
    res.json({ message: "Notifications cleared" });
  } catch (error) {
    console.error("Error clearing notifications:", error.message);
    res.status(500).json({ message: "Error clearing notifications", error: error.message });
  }
});

router.patch("/:id/toggle-read", verifyTokenAndRole, async (req, res) => {
  const { NotificationLocal, NotificationAtlas } = getNotificationModels();
  const { id } = req.params;
  const { read } = req.body;

  try {
    const [notificationLocal, notificationAtlas] = await Promise.all([
      NotificationLocal.findByIdAndUpdate(id, { read }, { new: true }),
      NotificationAtlas.findByIdAndUpdate(id, { read }, { new: true }),
    ]);

    if (!notificationLocal && !notificationAtlas) {
      return res.status(404).json({ message: "Notification not found" });
    }

    console.log(`Notification ${id} read status toggled to ${read}`);
    res.status(200).json(notificationAtlas || notificationLocal);
  } catch (error) {
    console.error("Error toggling notification read status:", error.message);
    res.status(500).json({ message: "Error toggling read status", error: error.message });
  }
});

module.exports = router;