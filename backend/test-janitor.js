const mongoose = require("mongoose");
const Janitor = require("./models/janitor");

// Before executing the script check the port number and database name
mongoose.connect("mongodb://localhost:27017/Smart_Cubicle")
    .then(async () => {
        console.log("MongoDB connected");

        const janitors = [
            {
                basicDetails: {
                    image: "/images/sadGato.jpg",
                    name: "Rafael Mendoza",
                    employeeId: "TUPM-22-0002",
                    email: "rafael.mendoza@tup.edu.ph",
                    contact: "+639222333444"
                },
                schedule: {
                    image: "/images/sadGato.jpg",
                    name: "Rafael Mendoza",
                    date: "2024-03-15",
                    shift: "Morning",
                    timeIn: "08:00 AM",
                    timeOut: "05:00 PM",
                    cleaningHour: "8 hours",
                    task: "General Cleaning",
                    status: "On Time"
                },
                performanceTrack: {
                    image: "/images/sadGato.jpg",
                    name: "Rafael Mendoza",
                    today: 7,
                    thisWeek: 35,
                    thisMonth: 140,
                    thisYear: 1680,
                    status: "Good",
                    employeeId: "JAN-002"
                },
                resourceUsage: {
                    image: "/images/sadGato.jpg",
                    name: "Rafael Mendoza",
                    resource: "Cleaning Supplies",
                    amountUsed: "4 units",
                    remaining: "16 units",
                    restocked: "Yes",
                    note: "Normal Usage",
                    employeeId: "JAN-002"
                },
                logsReport: {
                    image: "/images/sadGato.jpg",
                    name: "Rafael Mendoza",
                    date: "2024-03-15",
                    startTime: "08:00 AM",
                    endTime: "05:00 PM",
                    duration: 8,
                    task: "General Cleaning",
                    beforePicture: "/images/before2.jpg",
                    afterPicture: "/images/after2.jpg",
                    status: "Done"
                }
            },
            {
                basicDetails: {
                    image: "/images/sadGato.jpg",
                    name: "Carmen Ramos",
                    employeeId: "TUPM-22-0003",
                    email: "carmen.ramos@tup.edu.ph",
                    contact: "+639333444555"
                },
                schedule: {
                    image: "/images/sadGato.jpg",
                    name: "Carmen Ramos",
                    date: "2024-03-15",
                    shift: "Afternoon",
                    timeIn: "02:00 PM",
                    timeOut: "10:00 PM",
                    cleaningHour: "8 hours",
                    task: "Deep Cleaning",
                    status: "On Time"
                },
                performanceTrack: {
                    image: "/images/sadGato.jpg",
                    name: "Carmen Ramos",
                    today: 8,
                    thisWeek: 40,
                    thisMonth: 160,
                    thisYear: 1920,
                    status: "Excellent",
                    employeeId: "JAN-003"
                },
                resourceUsage: {
                    image: "/images/sadGato.jpg",
                    name: "Carmen Ramos",
                    resource: "Disinfectant",
                    amountUsed: "2 liters",
                    remaining: "8 liters",
                    restocked: "No",
                    note: "Low Usage",
                    employeeId: "JAN-003"
                },
                logsReport: {
                    image: "/images/sadGato.jpg",
                    name: "Carmen Ramos",
                    date: "2024-03-15",
                    startTime: "02:00 PM",
                    endTime: "10:00 PM",
                    duration: 8,
                    task: "Deep Cleaning",
                    beforePicture: "/images/before3.jpg",
                    afterPicture: "/images/after3.jpg",
                    status: "Done"
                }
            },
            {
                basicDetails: {
                    image: "/images/sadGato.jpg",
                    name: "Antonio Santos",
                    employeeId: "TUPM-22-0004",
                    email: "antonio.santos@tup.edu.ph",
                    contact: "+639444555666"
                },
                schedule: {
                    image: "/images/sadGato.jpg",
                    name: "Antonio Santos",
                    date: "2024-03-15",
                    shift: "Night",
                    timeIn: "10:00 PM",
                    timeOut: "06:00 AM",
                    cleaningHour: "8 hours",
                    task: "Night Cleaning",
                    status: "On Time"
                },
                performanceTrack: {
                    image: "/images/sadGato.jpg",
                    name: "Antonio Santos",
                    today: 6,
                    thisWeek: 30,
                    thisMonth: 120,
                    thisYear: 1440,
                    status: "Good",
                    employeeId: "JAN-004"
                },
                resourceUsage: {
                    image: "/images/sadGato.jpg",
                    name: "Antonio Santos",
                    resource: "Floor Wax",
                    amountUsed: "3 liters",
                    remaining: "7 liters",
                    restocked: "No",
                    note: "Medium Usage",
                    employeeId: "JAN-004"
                },
                logsReport: {
                    image: "/images/sadGato.jpg",
                    name: "Antonio Santos",
                    date: "2024-03-15",
                    startTime: "10:00 PM",
                    endTime: "06:00 AM",
                    duration: 8,
                    task: "Night Cleaning",
                    beforePicture: "/images/before4.jpg",
                    afterPicture: "/images/after4.jpg",
                    status: "Done"
                }
            }
        ];

        try {
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