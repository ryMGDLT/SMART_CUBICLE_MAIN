const mongoose = require("mongoose");

const janitorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  basicDetails: {
    image: { type: String, default: "" },
    name: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
  },
  schedule: [
    {
      date: { type: Date },
      status: { type: String, enum: ["Early", "On Time", "Over Time"] },
      image: { type: String },
    },
  ],
  performanceTrack: [
    {
      date: { type: Date },
      metric: { type: String },
      value: { type: Number },
      image: { type: String },
    },
  ],
  resourceUsage: [
    {
      date: { type: Date },
      resource: { type: String },
      quantity: { type: Number },
      image: { type: String },
    },
  ],
  logsReport: [
    {
      date: { type: Date },
      log: { type: String },
      image: { type: String },
    },
  ],
}, { timestamps: true });

// Function to get janitor models for both connections
const getJanitorModels = () => {
  if (!global.dbConnections) {
    throw new Error("Database connections not initialized");
  }
  if (!global.dbConnections.local) {
    throw new Error("Local database connection not initialized");
  }
  if (!global.dbConnections.atlas) {
    throw new Error("Atlas database connection not initialized");
  }

  // Register the schema with each connection if not already registered
  const JanitorLocal = global.dbConnections.local.models.Janitor || 
                       global.dbConnections.local.model("Janitor", janitorSchema);
  const JanitorAtlas = global.dbConnections.atlas.models.Janitor || 
                       global.dbConnections.atlas.model("Janitor", janitorSchema);

  return { JanitorLocal, JanitorAtlas };
};

module.exports = getJanitorModels;