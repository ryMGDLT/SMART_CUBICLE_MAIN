export const USER_DATA = [
    {
        // This data can be used for Log In and Janitors Page (Basic Details)
        fullName: "Maria Santos",
        username: "maria.santos",
        email: "maria.santos@smartcubicle.com",
        password: "hashedPassword123",
        employeeId: "JAN-2025-001",
        profileImage: "/images/profiles/maria-santos.jpg",
        contactNumber: "+63-912-345-6789",
        role: "janitor",
        status: "active",
        verificationToken: "vt-ms-001",
        verified: true,
        
        // These data can be used for Janitors Page (Schedule, Performance Track, Resource Usage, Logs Report)
        schedule: {
            fullName: "Maria Santos",
            profileImage: "/images/profiles/maria-santos.jpg",
            date: new Date("2025-02-18"),
            shift: "morning",
            timeIn: "07:00 AM",
            timeOut: "04:00 PM",
            cleaningHour: "8 hours",
            task: "Floor maintenance and sanitization",
            status: "on-duty"
        },
    
        performanceTrack: {
            fullName: "Maria Santos",
            profileImage: "/images/profiles/maria-santos.jpg",
            today: 95,
            thisWeek: 92,
            thisMonth: 90,
            thisYear: 88,
            status: "excellent"
        },
    
        resourceUsage: {
            fullName: "Maria Santos",
            profileImage: "/images/profiles/maria-santos.jpg",
            resource: "All-purpose cleaner",
            amountUsed: "500ml",
            remaining: "2.5L",
            restocked: false,
            note: "Need restock next week"
        },
    
        logsReport: {
            fullName: "Maria Santos",
            profileImage: "/images/profiles/maria-santos.jpg",
            date: new Date("2025-02-18"),
            startTime: "07:00 AM",
            endTime: "04:00 PM",
            duration: "9 hours",
            task: "General cleaning and sanitization",
            beforePicture: "/images/logs/before-ms-001.jpg",
            afterPicture: "/images/logs/after-ms-001.jpg",
            status: "completed"
        }
    },
    {
        fullName: "Nathan Drake",
        username: "nathan.drake",
        email: "nathan.drake@smartcubicle.com",
        password: "hashedPassword456",
        employeeId: "JAN-2025-002",
        profileImage: "/images/profiles/nathan-drake.jpg",
        contactNumber: "+63-923-456-7890",
        role: "janitor",
        status: "active",
        verificationToken: "vt-nd-002",
        verified: true,

        schedule: {
            fullName: "Nathan Drake",
            profileImage: "/images/profiles/nathan-drake.jpg",
            date: new Date("2025-02-18"),
            shift: "afternoon",
            timeIn: "02:00 PM",
            timeOut: "11:00 PM",
            cleaningHour: "8 hours",
            task: "Restroom maintenance and waste management",
            status: "on-duty"
        },

        performanceTrack: {
            fullName: "Nathan Drake",
            profileImage: "/images/profiles/nathan-drake.jpg",
            today: 88,
            thisWeek: 85,
            thisMonth: 87,
            thisYear: 86,
            status: "good"
        },

        resourceUsage: {
            fullName: "Nathan Drake",
            profileImage: "/images/profiles/nathan-drake.jpg",
            resource: "Disinfectant",
            amountUsed: "750ml",
            remaining: "1.75L",
            restocked: true,
            note: "Stock sufficient"
        },

        logsReport: {
            fullName: "Nathan Drake",
            profileImage: "/images/profiles/nathan-drake.jpg",
            date: new Date("2025-02-18"),
            startTime: "02:00 PM",
            endTime: "11:00 PM",
            duration: "9 hours",
            task: "Deep cleaning of restrooms",
            beforePicture: "/images/logs/before-nd-001.jpg",
            afterPicture: "/images/logs/after-nd-001.jpg",
            status: "in-progress"
        }
    },
    {
        fullName: "Lara Croft",
        username: "lara.croft",
        email: "lara.croft@smartcubicle.com",
        password: "hashedPassword789",
        employeeId: "JAN-2025-003",
        profileImage: "/images/profiles/lara-croft.jpg",
        contactNumber: "+63-934-567-8901",
        role: "janitor",
        status: "active",
        verificationToken: "vt-lc-003",
        verified: true,

        schedule: {
            fullName: "Lara Croft",
            profileImage: "/images/profiles/lara-croft.jpg",
            date: new Date("2025-02-18"),
            shift: "night",
            timeIn: "10:00 PM",
            timeOut: "07:00 AM",
            cleaningHour: "8 hours",
            task: "Deep cleaning and floor polishing",
            status: "scheduled"
        },

        performanceTrack: {
            fullName: "Lara Croft",
            profileImage: "/images/profiles/lara-croft.jpg",
            today: 92,
            thisWeek: 90,
            thisMonth: 91,
            thisYear: 89,
            status: "excellent"
        },

        resourceUsage: {
            fullName: "Lara Croft",
            profileImage: "/images/profiles/lara-croft.jpg",
            resource: "Floor polish",
            amountUsed: "1L",
            remaining: "4L",
            restocked: true,
            note: "Recently restocked"
        },

        logsReport: {
            fullName: "Lara Croft",
            profileImage: "/images/profiles/lara-croft.jpg",
            date: new Date("2025-02-18"),
            startTime: "10:00 PM",
            endTime: "07:00 AM",
            duration: "9 hours",
            task: "Night shift general cleaning",
            beforePicture: "/images/logs/before-lc-001.jpg",
            afterPicture: "/images/logs/after-lc-001.jpg",
            status: "pending"
        }
    }
];

// This sample data