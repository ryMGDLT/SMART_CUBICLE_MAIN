const getJanitorModels  = require("../models/Janitor");
const mongoose = require("mongoose");

// GET all janitors
const getAllJanitors = async (req, res) => {
  try {
    console.log("Fetching all janitors");
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { JanitorAtlas } = getJanitorModels();
    const janitors = await JanitorAtlas.find({});
    console.log("Fetched all janitors from Atlas:", janitors.map(j => j._id));
    res.status(200).json(janitors);
  } catch (error) {
    console.error("Error fetching janitors:", error.message, error.stack);
    res.status(500).json({ message: "Failed to fetch janitors", error: error.message });
  }
};

// GET a single janitor
const getJanitorById = async (req, res) => {
  try {
    console.log("Fetching janitor with ID:", req.params.id);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { JanitorAtlas } = getJanitorModels();
    const janitor = await JanitorAtlas.findById(req.params.id);
    if (janitor) {
      console.log("Fetched janitor from Atlas:", janitor._id);
      res.json(janitor);
    } else {
      console.error("Janitor not found with _id:", req.params.id);
      res.status(404).json({ message: "Janitor not found" });
    }
  } catch (error) {
    console.error("Error fetching janitor:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

// POST a new janitor
const createJanitor = async (req, res) => {
  try {
    console.log("Received create janitor request:", req.body);
    if (!global.dbConnections) throw new Error("Database connections not initialized");
    if (!global.dbConnections.local) throw new Error("Local database connection not initialized");
    if (!global.dbConnections.atlas) throw new Error("Atlas database connection not initialized");

    const { JanitorLocal, JanitorAtlas } = getJanitorModels();
    const janitorId = new mongoose.Types.ObjectId();
    console.log("Generated janitor _id:", janitorId.toString());

    const janitorData = {
      _id: janitorId, 
      ...req.body,
    };

    console.log("Attempting to save janitor to Local...");
    const janitorLocal = new JanitorLocal(janitorData);
    const newJanitorLocal = await janitorLocal.save().catch(err => {
      throw new Error(`Failed to save janitor to Local: ${err.message}`);
    });
    console.log("Janitor saved to Local:", newJanitorLocal._id);

    console.log("Attempting to save janitor to Atlas...");
    const janitorAtlas = new JanitorAtlas(janitorData);
    const newJanitorAtlas = await janitorAtlas.save().catch(err => {
      JanitorLocal.deleteOne({ _id: janitorId }).catch(() => {});
      throw new Error(`Failed to save janitor to Atlas: ${err.message}`);
    });
    console.log("Janitor saved to Atlas:", newJanitorAtlas._id);

    res.status(201).json(newJanitorLocal);
  } catch (error) {
    console.error("Error creating janitor:", error.message, error.stack);
    res.status(400).json({ message: error.message });
  }
};

// UPDATE a janitor
const updateJanitor = async (req, res) => {
  try {
    console.log("Received update request for janitor ID:", req.params.id, "with data:", req.body);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { JanitorLocal, JanitorAtlas } = getJanitorModels();

    const janitorLocal = await JanitorLocal.findById(req.params.id);
    const janitorAtlas = await JanitorAtlas.findById(req.params.id);

    if (!janitorLocal || !janitorAtlas) {
      console.error("Janitor not found with _id:", req.params.id);
      return res.status(404).json({ message: "Janitor not found" });
    }

    console.log("Janitor found - Local:", janitorLocal._id, "Atlas:", janitorAtlas._id);

    Object.assign(janitorLocal, req.body);
    Object.assign(janitorAtlas, req.body);

    console.log("Attempting to update janitor in Local...");
    const updatedJanitorLocal = await janitorLocal.save().catch(err => {
      throw new Error(`Failed to update janitor in Local: ${err.message}`);
    });
    console.log("Janitor updated in Local:", updatedJanitorLocal._id);

    console.log("Attempting to update janitor in Atlas...");
    const updatedJanitorAtlas = await janitorAtlas.save().catch(err => {
      throw new Error(`Failed to update janitor in Atlas: ${err.message}`);
    });
    console.log("Janitor updated in Atlas:", updatedJanitorAtlas._id);

    res.json(updatedJanitorLocal);
  } catch (error) {
    console.error("Error updating janitor:", error.message, error.stack);
    res.status(400).json({ message: error.message });
  }
};

// UPDATE janitor schedule status
const updateScheduleStatus = async (req, res) => {
  try {
    console.log("Received schedule status update request for janitor ID:", req.params.id, "with data:", req.body);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { JanitorLocal, JanitorAtlas } = getJanitorModels();
    const { status } = req.body;
    const janitorId = req.params.id;

    if (!status) {
      console.error("Status is required but not provided");
      return res.status(400).json({ message: "Status is required" });
    }

    const validStatuses = ["Early", "On Time", "Over Time"];
    if (!validStatuses.includes(status)) {
      console.error("Invalid status value:", status);
      return res.status(400).json({ message: "Invalid status value" });
    }

    const janitorLocal = await JanitorLocal.findById(janitorId);
    const janitorAtlas = await JanitorAtlas.findById(janitorId);

    if (!janitorLocal || !janitorAtlas) {
      console.error("Janitor not found with _id:", janitorId);
      return res.status(404).json({ message: "Janitor not found" });
    }

    console.log("Janitor found for schedule update - Local:", janitorLocal._id, "Atlas:", janitorAtlas._id);

    janitorLocal.schedule.forEach((entry) => (entry.status = status));
    janitorAtlas.schedule.forEach((entry) => (entry.status = status));

    console.log("Attempting to update schedule status in Local...");
    const updatedJanitorLocal = await janitorLocal.save().catch(err => {
      throw new Error(`Failed to update schedule status in Local: ${err.message}`);
    });
    console.log("Schedule status updated in Local:", updatedJanitorLocal._id);

    console.log("Attempting to update schedule status in Atlas...");
    const updatedJanitorAtlas = await janitorAtlas.save().catch(err => {
      throw new Error(`Failed to update schedule status in Atlas: ${err.message}`);
    });
    console.log("Schedule status updated in Atlas:", updatedJanitorAtlas._id);

    res.json({
      message: "Status updated successfully",
      status: updatedJanitorLocal.schedule.map((sched) => sched.status),
    });
  } catch (error) {
    console.error("Error updating schedule status:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

// DELETE a janitor
const deleteJanitor = async (req, res) => {
  try {
    console.log("Received delete request for janitor ID:", req.params.id);
    if (!global.dbConnections) throw new Error("Database connections not initialized");

    const { JanitorLocal, JanitorAtlas } = getJanitorModels();

    const janitorLocal = await JanitorLocal.findById(req.params.id);
    const janitorAtlas = await JanitorAtlas.findById(req.params.id);

    if (!janitorLocal || !janitorAtlas) {
      console.error("Janitor not found with _id:", req.params.id);
      return res.status(404).json({ message: "Janitor not found" });
    }

    console.log("Janitor found for deletion - Local:", janitorLocal._id, "Atlas:", janitorAtlas._id);

    console.log("Attempting to delete janitor from Local...");
    await JanitorLocal.deleteOne({ _id: req.params.id }).catch(err => {
      throw new Error(`Failed to delete janitor from Local: ${err.message}`);
    });
    console.log("Janitor deleted from Local:", req.params.id);

    console.log("Attempting to delete janitor from Atlas...");
    await JanitorAtlas.deleteOne({ _id: req.params.id }).catch(err => {
      throw new Error(`Failed to delete janitor from Atlas: ${err.message}`);
    });
    console.log("Janitor deleted from Atlas:", req.params.id);

    res.json({ message: "Janitor deleted" });
  } catch (error) {
    console.error("Error deleting janitor:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllJanitors,
  getJanitorById,
  createJanitor,
  updateJanitor,
  updateScheduleStatus,
  deleteJanitor,
};