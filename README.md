# SMART_CUBICLE_MAIN

## Description
A smart facility management system designed to optimize cubicle maintenance and monitoring in the Technological University of the Philippines. The system streamlines janitor scheduling, resource management, and usage analytics.

## Members
- Santos, Rafaella
- Infante, Charlin
- Magdalita, Ryan Rey
- Mission, Joey Boy
- Pontanos, John Michael

## Features
- User Authentication
  - Login Page: Secure access with email/username and password authentication
  - Register Page: New user account creation with role assignment
- Dashboard
  - Scheduling and Event Monitoring
    - Calendar: Interactive monthly view of all scheduled activities
    - Reminders: Important notifications for cleaning and restocking tasks
    - Janitor Schedule: Real-time tracking of janitor assignments and status
  - Summarized Reports
    - Usage Peak Hour: Analysis of highest facility usage periods
    - Total Cleaning Time: Accumulated time spent on maintenance
    - Recommended Cleaning Time: AI-driven suggestions for optimal cleaning schedules
    - Total Resources Restocked: Inventory replenishment tracking
    - Recommended Restocking Time: Predictive alerts for resource management
  - Graphical Reports
    - Resource Usage: Visual representation of consumable utilization
    - Trends Over Time: Long-term pattern analysis of facility usage
    - Usage Monitoring: Real-time occupancy and resource consumption tracking
- Usage Monitor
  - Usage Statistics
    - Daily Usage: Current and previous day's visitor count
    - Period Analytics: Weekly, monthly, and yearly usage trends
  - Sensor Data
    - Time-based Monitoring: Hourly facility usage patterns
    - Capacity Tracking: Real-time occupancy levels
    - Environmental Metrics: Temperature and water level monitoring
    - Status Indicators: Door state and maintenance alerts
  - Janitor Schedule Overview: Real-time status of cleaning assignments
- Janitors
  - Basic Details: Employee profiles and contact information
  - Schedule: Shift planning and assignment management
  - Performance Track: Work efficiency and task completion monitoring
  - Resources Usage: Supply utilization tracking
  - Logs and Report: Activity history and performance analytics
  - Employee Management
    - Employee ID tracking
    - Contact information
    - Email management
    - Profile editing capabilities
- Resources
  - Resource Usage Analytics
    - Graphical representation of actual vs recommended usage
    - Resource-specific consumption tracking
    - Historical usage trends over time
  - Inventory Management
    - Current stock monitoring
    - Restock threshold settings
    - Automated restocking recommendations
  - Resource Status Tracking
    - Stock levels (Sufficient, Low Stock, Almost Out)
    - Last restocked dates
    - Next restocking schedule
  - Resource Types
    - Water Usage
    - Bleach (Toilet)
    - Bleach (Walls & Floor)
    - Detergent
  - Reminders
    - Usage alerts (Excessive, Normal, Below Average)
    - Restocking notifications
    - Resource-specific status updates
- Settings
  - Notification Preferences: Customize alert settings
  - Theme Selection: Toggle between light and dark modes
  - Password Management: Secure password update functionality

## Recent Updates and Improvements

### Mobile Optimization
- **Mobile-First Components**: Optimized UI components for mobile devices
  - Users Component: Responsive card-based layout with touch-friendly interactions
  - Janitors Component: Mobile-optimized view with floating action buttons
  - Profile Component: Streamlined mobile interface with full-width inputs

### Data Management
- **Centralized Data Store**: New `placeholderData.js` for improved data organization (This is only for temporary use, waiting for backend implementation)
  - Users data: Comprehensive user information including status and priorities
  - Janitors data: Employee profiles with contact information
  - Profile data: User profile information and settings

### UI/UX Improvements
- **Enhanced User Interface**
  - Improved search functionality with fuzzy matching
  - Touch-optimized buttons and input fields
  - Consistent styling with Icpetgreen theme
  - Responsive pagination controls
  - Tab navigation for better mobile experience

### Component Updates
- **Users Management**
  - New mobile-friendly card layout
  - Status indicators (Pending, Accepted, Declined)
  - Priority user flagging
  - Batch selection capabilities
  - Advanced search and filtering

- **Janitors Management**
  - Floating action button for report generation
  - Improved mobile search interface
  - Enhanced tab navigation
  - Optimized list view for mobile devices

- **Profile Management**
  - Centralized profile data storage
  - Profile picture management
  - Responsive form layout
  - Touch-friendly input fields

## Installation
1. Clone the repository
2. Make sure to locate the proper directory which is the `.\frontend` directory
3. Run `npm install`
4. Run `npm start`
5. Wait for the app to load in the browser
6. Enjoy!
