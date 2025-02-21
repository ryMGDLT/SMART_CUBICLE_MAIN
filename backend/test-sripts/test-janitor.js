const mongoose = require("mongoose");
const Janitor = require("../models/janitor");

// Before executing the script check the port number and database name
mongoose.connect("mongodb://localhost:27017/Smart_Cubicle")
    .then(async () => {
        console.log("MongoDB connected");

        const janitors = [
            {
                basicDetails: {
                    image: "/images/sadGato.jpg",
                    name: "Sofia Reyes",
                    employeeId: "TUPM-23-0008",
                    email: "sofia.reyes@tup.edu.ph",
                    contact: "+639234567890"
                },
                schedule: {
                    image: "/images/sadGato.jpg",
                    name: "Sofia Reyes",
                    date: "2024-05-21",
                    shift: "Morning",
                    timeIn: "07:00 AM",
                    timeOut: "04:00 PM",
                    cleaningHour: "9 hours",
                    task: "General Cleaning",
                    status: "On Time"
                },
                performanceTrack: {
                    image: "/images/sadGato.jpg",
                    name: "Sofia Reyes",
                    today: 8,
                    thisWeek: 42,
                    thisMonth: 168,
                    thisYear: 2016,
                    maxCleaningHour: 9,
                    minCleaningHour: 8,
                    status: "Excellent",
                    employeeId: "JAN-008"
                },
                resourceUsage: {
                    image: "/images/sadGato.jpg",
                    name: "Sofia Reyes",
                    resource: "Glass Cleaner",
                    amountUsed: "2 liters",
                    remaining: "8 liters",
                    restocked: "No",
                    note: "Normal Usage",
                    employeeId: "JAN-008"
                },
                logsReport: {
                    image: "/images/sadGato.jpg",
                    name: "Sofia Reyes",
                    date: "2024-05-21",
                    startTime: "07:00 AM",
                    endTime: "04:00 PM",
                    duration: 9,
                    task: "General Cleaning",
                    beforePicture: "/images/before8.jpg",
                    afterPicture: "/images/after8.jpg",
                    status: "Completed"
                }
            },
            {
                basicDetails: {
                    image: "/images/sadGato.jpg",
                    name: "Carlos Mendoza",
                    employeeId: "TUPM-23-0009",
                    email: "carlos.mendoza@tup.edu.ph",
                    contact: "+639345678901"
                },
                schedule: {
                    image: "/images/sadGato.jpg",
                    name: "Carlos Mendoza",
                    date: "2024-05-21",
                    shift: "Afternoon",
                    timeIn: "12:30 PM",
                    timeOut: "08:30 PM",
                    cleaningHour: "8 hours",
                    task: "Waste Management",
                    status: "Early"
                },
                performanceTrack: {
                    image: "/images/sadGato.jpg",
                    name: "Carlos Mendoza",
                    today: 9,
                    thisWeek: 40,
                    thisMonth: 160,
                    thisYear: 1920,
                    maxCleaningHour: 9,
                    minCleaningHour: 8,
                    status: "Outstanding",
                    employeeId: "JAN-009"
                },
                resourceUsage: {
                    image: "/images/sadGato.jpg",
                    name: "Carlos Mendoza",
                    resource: "Trash Bags",
                    amountUsed: "50 pieces",
                    remaining: "150 pieces",
                    restocked: "Yes",
                    note: "High Usage",
                    employeeId: "JAN-009"
                },
                logsReport: {
                    image: "/images/sadGato.jpg",
                    name: "Carlos Mendoza",
                    date: "2024-05-21",
                    startTime: "12:30 PM",
                    endTime: "08:30 PM",
                    duration: 8,
                    task: "Waste Management",
                    beforePicture: "/images/before9.jpg",
                    afterPicture: "/images/after9.jpg",
                    status: "Finished"
                }
            },
            {
                basicDetails: {
                    image: "/images/janitor3.jpg",
                    name: "Gabriela Santos",
                    employeeId: "TUPM-23-0010",
                    email: "gabriela.santos@tup.edu.ph",
                    contact: "+639456789012"
                },
                schedule: {
                    image: "/images/janitor3.jpg",
                    name: "Gabriela Santos",
                    date: "2024-05-21",
                    shift: "Night",
                    timeIn: "10:00 PM",
                    timeOut: "06:00 AM",
                    cleaningHour: "8 hours",
                    task: "Disinfection",
                    status: "On Time"
                },
                performanceTrack: {
                    image: "/images/janitor3.jpg",
                    name: "Gabriela Santos",
                    today: 8,
                    thisWeek: 39,
                    thisMonth: 156,
                    thisYear: 1872,
                    maxCleaningHour: 8,
                    minCleaningHour: 8,
                    status: "Very Good",
                    employeeId: "JAN-010"
                },
                resourceUsage: {
                    image: "/images/janitor3.jpg",
                    name: "Gabriela Santos",
                    resource: "Disinfectant",
                    amountUsed: "4 liters",
                    remaining: "6 liters",
                    restocked: "No",
                    note: "Normal Usage",
                    employeeId: "JAN-010"
                },
                logsReport: {
                    image: "/images/janitor3.jpg",
                    name: "Gabriela Santos",
                    date: "2024-05-21",
                    startTime: "10:00 PM",
                    endTime: "06:00 AM",
                    duration: 8,
                    task: "Disinfection",
                    beforePicture: "/images/before10.jpg",
                    afterPicture: "/images/after10.jpg",
                    status: "Completed"
                }
            }
        ];

        try {
            // Clear existing data
            await Janitor.deleteMany({});
            console.log("Existing janitors cleared.");

            // Insert new data without clearing existing data
            for (const janitor of janitors) {
                const newJanitor = new Janitor(janitor);
                await newJanitor.save();
                console.log(`New janitor ${janitor.basicDetails.name} created.`);
            }
        } catch (error) {
            console.warn("MongoDB connection error:", error);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(error => {
        console.error("MongoDB connection error:", error);
        mongoose.connection.close();
    });