const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
});

const getNotificationModels = () => {
  if (!global.dbConnections) {
    throw new Error("Database connections not initialized");
  }
  const NotificationLocal = global.dbConnections.local.model("Notification", notificationSchema);
  const NotificationAtlas = global.dbConnections.atlas.model("Notification", notificationSchema);
  return { NotificationLocal, NotificationAtlas };
};

module.exports = getNotificationModels;