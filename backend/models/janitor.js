const mongoose = require("mongoose");

const janitorSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
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
      image: { type: String },
      name: { type: String },
      date: { type: String }, 
      shift: { type: String },
      timeIn: { type: String },
      timeOut: { type: String },
      cleaningHour: { type: String }, 
      task: { type: String },
      status: { type: String, enum: ["Early", "On Time", "Over Time"] },
    },
  ],
  performanceTrack: [
    {
      image: { type: String },
      name: { type: String },
      today: { type: Number },
      thisWeek: { type: Number },
      thisMonth: { type: Number },
      thisYear: { type: Number },
      maxCleaningHour: { type: Number },
      minCleaningHour: { type: Number },
      status: { type: String },
      employeeId: { type: String },
    },
  ],
  resourceUsage: [
    {
      image: { type: String },
      name: { type: String },
      resource: { type: String },
      amountUsed: { type: String },
      remaining: { type: String },
      restocked: { type: Boolean }, 
      note: { type: String },
      employeeId: { type: String },
    },
  ],
  logsReport: [
    {
      image: { type: String },
      name: { type: String },
      date: { type: String }, 
      startTime: { type: String },
      endTime: { type: String },
      duration: { type: Number },
      task: { type: String },
      beforePicture: { type: String },
      afterPicture: { type: String },
      status: { type: String },
    },
  ],
}, { timestamps: true, _id: false });

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

  const JanitorLocal =
    global.dbConnections.local.models.Janitor ||
    global.dbConnections.local.model("Janitor", janitorSchema);
  const JanitorAtlas =
    global.dbConnections.atlas.models.Janitor ||
    global.dbConnections.atlas.model("Janitor", janitorSchema);

  return { JanitorLocal, JanitorAtlas };
};

module.exports = getJanitorModels;