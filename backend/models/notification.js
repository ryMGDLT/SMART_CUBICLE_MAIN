const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
});

// Function to get notification model for Atlas connection only
const getNotificationModels = () => {
  if (!global.dbConnections) {
    throw new Error("Database connections not initialized");
  }
  if (!global.dbConnections.atlas) {
    throw new Error("Atlas database connection not initialized");
  }

  const NotificationAtlas =
    global.dbConnections.atlas.models.Notification ||
    global.dbConnections.atlas.model("Notification", notificationSchema);

  return { NotificationAtlas };
};

module.exports = getNotificationModels;