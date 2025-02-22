const mongoose = require('mongoose');
const Janitor = require('../models/janitor'); 


mongoose.connect('mongodb://localhost:6969/Smart_Cubicle', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateJanitor() {
  try {
    await Janitor.updateOne(
      { _id: "67ba25357fc0499e36e1da4b" },
      {
        $push: {
          schedule: {
            image: "",
            name: "Joey boy Mission",
            date: "2025-02-23",
            shift: "Morning",
            timeIn: "12:00 PM",
            timeOut: "02:00 PM",
            cleaningHour: "6",
            task: "Clean RestRoom",
            status: "On Time",
          },
         performanceTrack: {
            image: "",
            name: "Joey boy Mission",
            today: 4,
            thisWeek: 16,
            thisMonth: 64,
            thisYear: 768,
            maxCleaningHour: 6,
            minCleaningHour: 2,
            status: "Good",
            employeeId: "TUPM-21-7232",
          },
          resourceUsage: {
            image: "",
            name: "Joey boy Mission",
            resource: "Mop Detergent",
            amountUsed: "10 liter",
            remaining: "10 liters",
            restocked: "2025-02-23",
            note: "Abuse Usage",
            employeeId: "TUPM-21-7232",
          },
          logsReport: {
            image: "",
            name: "Joey boy Mission",
            date: "2025-02-24",
            startTime: "12:00 PM",
            endTime: "02:00 PM",
            duration: 4,
            task: "Clean Restroom",
            beforePicture: "",
            afterPicture: "",
            status: "Done",
          },
        },
      }
    );
    console.log("Janitor arrays updated successfully!");
  } catch (error) {
    console.error("Error updating janitor:", error);
  } finally {
    mongoose.connection.close();
  }
}

updateJanitor();