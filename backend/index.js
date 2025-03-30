const { getIPAddress, getPortBackend, getPortFrontend } = require("./utils/getIPPORT");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const janitorRoutes = require("./routes/janitorRoutes");
const notificationRoutes = require("./routes/notificationRoutes"); 
const path = require("path");

const localIP = getIPAddress();
const portBack = getPortBackend();
const portFront = getPortFrontend();

console.log("SendGrid API Key:", process.env.SENDGRID_API_KEY ? "Set" : "Not Set");
console.log("From Email:", process.env.FROM_EMAIL);

if (
  !process.env.SENDGRID_API_KEY ||
  !process.env.SENDGRID_API_KEY.startsWith("SG.")
) {
  console.error("Invalid SendGrid API Key. Please check your .env file.");
  process.exit(1);
}

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", `http://${localIP}:${portFront}`],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connections
const connectToDatabases = async () => {
  try {
    const localUri = process.env.MONGO_URI || "mongodb://localhost:6969/Smart_Cubicle";
    const localConnection = await mongoose.createConnection(localUri).asPromise();
    console.log("Connected to Local MongoDB");

    const atlasUri = process.env.MONGO_ATLAS_URI;
    if (!atlasUri) {
      throw new Error("MONGO_ATLAS_URI is not defined in .env");
    }
    const atlasConnection = await mongoose.createConnection(atlasUri).asPromise();
    console.log("Connected to MongoDB Atlas");

    global.dbConnections = {
      local: localConnection,
      atlas: atlasConnection,
    };
    console.log("DB Connections initialized:", !!global.dbConnections.local, !!global.dbConnections.atlas);

    // Routes 
    app.use("/users", userRoutes);
    app.use("/janitors", janitorRoutes);
    app.use("/notifications", notificationRoutes); 

    // Start the server 
    app.listen(portBack, "0.0.0.0", () => {
      console.log(`Backend server running at http://localhost:${portBack}`);
      console.log(
        `Backend server accessible on the network at http://${localIP}:${portBack}`
      );
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};


connectToDatabases();