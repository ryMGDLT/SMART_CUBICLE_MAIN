const mongoose = require('mongoose');
const getJanitorModels = require('../models/Janitor'); 

// MongoDB Local connection
const localDb = mongoose.createConnection('mongodb://localhost:6969/Smart_Cubicle');

// MongoDB Atlas connection with your URI
const atlasDb = mongoose.createConnection('mongodb+srv://SmartUser:NewPass123%21@smartrestroomweb.ucrsk.mongodb.net/Smart_Cubicle?retryWrites=true&w=majority&appName=SmartRestroomWeb');


global.dbConnections = {
  local: localDb,
  atlas: atlasDb,
};

async function updateJanitor() {
  try {
  
    await Promise.all([
      new Promise(resolve => localDb.once('connected', resolve)),
      new Promise(resolve => atlasDb.once('connected', resolve)),
    ]);
    console.log("Connected to both Local and Atlas databases");

    // Get Janitor models for both databases
    const { JanitorLocal, JanitorAtlas } = getJanitorModels();

  
    const janitorId = "67f283827416ea05a4e0d230";

    // Get the current date and time
    const currentDate = new Date();
    // Format date as MM/DD/YYYY
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    // Data to push into the arrays
    const updateData = {
      $push: {
        schedule: {
          image: "",
          name: "james kupal",
          date: formattedDate,
          shift: "Morning",
          timeIn: "04:00 PM",
          timeOut: "06:00 PM",
          cleaningHour: "6",
          task: "Clean RestRoom",
          status: "On Time",
        },
        performanceTrack: {
          image: "",
          name: "james kupal",
          today: 4,
          thisWeek: 16,
          thisMonth: 64,
          thisYear: 769,
          maxCleaningHour: 8,
          minCleaningHour: 3,
          status: "Good",
          employeeId: "TUPM-00-9009",
        },
        resourceUsage: {
          image: "",
          name: "james kupal",
          resource: "Detergent",
          amountUsed: "10 liter",
          remaining: "10 liters",
          restocked: true, 
          note: "Abuse Usage",
          employeeId: "TUPM-00-9009",
        },
        logsReport: {
          image: "",
          name: "james kupal",
          date: formattedDate, 
          startTime: "04:00 PM",
          endTime: "06:00 PM",
          duration: 4,
          task: "Clean Restroom",
          beforePicture: "",
          afterPicture: "",
          status: "Done",
        },
      },
    };

    // Update janitor in both Local and Atlas databases
    const [localResult, atlasResult] = await Promise.all([
      JanitorLocal.updateOne({ _id: janitorId }, updateData),
      JanitorAtlas.updateOne({ _id: janitorId }, updateData),
    ]);

    // Check if updates were successful
    if (localResult.modifiedCount > 0 && atlasResult.modifiedCount > 0) {
      console.log(`Janitor with _id: ${janitorId} arrays updated successfully in both databases!`);
      console.log("Updated with formatted date:", formattedDate);
      console.log("Local update result:", localResult);
      console.log("Atlas update result:", atlasResult);
    } else {
      console.log(`No janitor records were updated for _id: ${janitorId}. Check if the record exists.`);
      console.log("Local result:", localResult);
      console.log("Atlas result:", atlasResult);
    }
  } catch (error) {
    console.error("Error updating janitor:", error);
  } finally {
    
    await Promise.all([
      localDb.close(),
      atlasDb.close(),
    ]);
    console.log("Database connections closed");
  }
}

// Run the update function
updateJanitor();