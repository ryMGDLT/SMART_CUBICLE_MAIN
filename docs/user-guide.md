# Smart Restroom System - User Guide

## 📚 Table of Contents
1. [Getting Started](#getting-started)
2. [User Roles & Permissions](#user-roles--permissions)
3. [System Navigation](#system-navigation)
4. [Dashboard Overview](#dashboard-overview)
5. [User Management](#user-management)
6. [Janitor Management](#janitor-management)
7. [Resource Management](#resource-management)
8. [Usage Monitoring](#usage-monitoring)
9. [Reports & Analytics](#reports--analytics)
10. [Settings & Configuration](#settings--configuration)
11. [Mobile Interface](#mobile-interface)
12. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### First Time Login
1. **Access the System**
   - Open your web browser
   - Navigate to the system URL provided by your administrator
   - The system works on desktop, tablet, and mobile devices

2. **Login Process**
   - Enter your email address and password
   - Click "Login" to access the dashboard
   - If you forget your password, click "Forgot Password" to reset it

3. **Account Verification**
   - New accounts require email verification
   - Check your inbox for a verification email
   - Click the verification link to activate your account
   - Admin approval may be required for certain roles

### System Requirements
- **Browser:** Chrome, Firefox, Safari, or Edge (latest versions)
- **Internet:** Stable internet connection for real-time features
- **Screen:** Minimum 320px width (mobile) to 1920px+ (desktop)
- **JavaScript:** Must be enabled for full functionality

---

## 👥 User Roles & Permissions

### 🔧 Superadmin
- **Full System Access:** Complete control over all features
- **User Management:** Create, edit, delete any user account
- **System Configuration:** Modify system settings and parameters
- **Data Access:** View all analytics and reports
- **Hardware Control:** Manage sensor configurations and settings

### 👨‍💼 Admin
- **Management Dashboard:** Access to administrative features
- **User Approval:** Accept/decline user registrations
- **Janitor Management:** Assign schedules and track performance
- **Resource Oversight:** Monitor inventory and approve restocking
- **Analytics Access:** View reports and performance metrics

### 🧹 Janitor
- **Task Management:** View assigned schedules and tasks
- **Status Updates:** Mark tasks as complete with photo evidence
- **Resource Reporting:** Report supply usage and needs
- **Mobile Interface:** Optimized mobile experience for field work
- **Performance Tracking:** View personal performance metrics

### 👤 User
- **Profile Management:** Update personal information
- **Basic Reporting:** Submit maintenance requests
- **Notification Access:** Receive important updates
- **Limited Dashboard:** View relevant information only

---

## 🧭 System Navigation

### Main Navigation Menu
The system features a responsive sidebar with the following sections:

#### 📊 **Dashboard**
- Overview of system status
- Real-time sensor data
- Key performance indicators
- Quick access to urgent tasks

#### 👥 **Users** (Admin/Superadmin only)
- User account management
- Registration approvals
- Role assignments
- User activity tracking

#### 🧹 **Janitors**
- Janitor profiles and schedules
- Performance tracking
- Task assignments
- Resource usage monitoring

#### 📦 **Resources**
- Inventory management
- Usage analytics
- Restocking alerts
- Supply level monitoring

#### 📈 **Usage Monitor**
- Real-time facility usage
- Sensor data visualization
- Historical usage patterns
- Environmental monitoring

#### ⚙️ **Settings**
- User preferences
- Notification settings
- System configuration
- Theme selection

---

## 📊 Dashboard Overview

### Real-Time Monitoring Panel
The dashboard provides a comprehensive view of your facility's status:

#### 📅 **Calendar Integration**
- **Monthly View:** See all scheduled maintenance activities
- **Daily Tasks:** Click on any date to view specific tasks
- **Quick Navigation:** Navigate between months easily
- **Event Indicators:** Color-coded events for different types of activities

#### 🔔 **Reminders & Alerts**
- **Cleaning Schedule:** Automated reminders for routine maintenance
- **Peak Hours:** Notifications during high-usage periods  
- **Resource Restocking:** Alerts when supplies run low
- **Custom Reminders:** Set personalized maintenance reminders

#### 👷 **Janitor Schedule (Today)**
- **Real-Time Status:** See current janitor assignments
- **Status Indicators:**
  - 🟢 **Done:** Task completed successfully
  - 🔴 **Overdue:** Task past scheduled time
  - 🟡 **Pending:** Task scheduled but not started
- **Quick Actions:** Access detailed task information

### Performance Metrics Cards

#### 📈 **Usage Peak Hour Analysis**
- **Current Peak:** Display of today's highest usage time
- **Historical Comparison:** Compare with previous periods
- **Trend Indicators:** Visual arrows showing increase/decrease
- **ML Predictions:** Machine learning forecasts for optimal scheduling

#### ⏱️ **Cleaning Time Tracking**
- **Total Cleaning Time:** Accumulated maintenance hours
- **Recommended Time:** AI-suggested optimal cleaning duration
- **Efficiency Metrics:** Performance vs. recommended benchmarks
- **Time Optimization:** Suggestions for schedule improvements

#### 📦 **Resource Management**
- **Total Resources Restocked:** Count of supply replenishments
- **Recommended Restocking:** Predictive alerts for supply needs
- **Usage Patterns:** Analysis of consumption trends
- **Cost Optimization:** Insights for budget planning

### Interactive Charts & Visualizations

#### 📊 **Resource Usage Chart**
- **Chart Types:** Toggle between bar chart and line graph
- **Real-Time Data:** Live updates from sensor readings
- **Historical View:** Compare current vs. historical usage
- **Resource Breakdown:** Detailed view by supply type

#### 📈 **Trends Over Time**
- **Customizable Timeframe:** Daily, weekly, monthly, yearly views
- **Multiple Metrics:** Overlay different data points
- **Trend Analysis:** Identify patterns and anomalies
- **Predictive Modeling:** ML-generated usage forecasts

---

## 👥 User Management

### Adding New Users (Admin/Superadmin)

#### Registration Process
1. **Navigate to Users Section**
   - Click "Users" in the main navigation
   - Click "Add New User" button

2. **Complete User Information**
   ```
   Required Fields:
   • Full Name
   • Username (unique)
   • Email Address
   • Employee ID (format: TUPM-XX-XXXX)
   • Contact Number
   • Role Selection
   • Initial Password
   ```

3. **Role Assignment**
   - **Superadmin:** Full system access
   - **Admin:** Management capabilities
   - **Janitor:** Field operations
   - **User:** Basic access

4. **Account Activation**
   - User receives email verification
   - Admin approval may be required
   - Account status changes to "Active"

### Managing Existing Users

#### User Status Management
- **Pending:** Awaiting verification or approval
- **Accepted:** Active account with full access
- **Declined:** Rejected registration

#### Bulk Operations
- **Select Multiple Users:** Use checkboxes for batch actions
- **Bulk Approval:** Accept multiple pending users
- **Bulk Status Updates:** Change status for multiple accounts
- **Export Data:** Download user information for reporting

#### User Profile Updates
1. **Click on User Name** to open profile
2. **Edit Information** using the form fields
3. **Upload Profile Image** using the image upload feature
4. **Save Changes** to update the database

---

## 🧹 Janitor Management

### Janitor Profiles

#### Basic Details Management
```
Profile Information:
• Profile Image Upload
• Full Name and Contact Details
• Employee ID and Email
• Contact Number
• Department Assignment
```

#### Performance Tracking
- **Daily Metrics:** Tasks completed today
- **Weekly Summary:** Performance over 7 days
- **Monthly Analytics:** Comprehensive monthly report
- **Yearly Overview:** Annual performance analysis

### Schedule Management

#### Creating Schedules
1. **Access Janitor Profile**
   - Navigate to Janitors section
   - Select the janitor from the list
   - Click on "Schedule" tab

2. **Add New Schedule Entry**
   ```
   Schedule Details:
   • Date Selection
   • Shift Time (Morning/Afternoon/Evening)
   • Time In/Time Out
   • Cleaning Duration
   • Specific Tasks
   • Location Assignment
   ```

3. **Status Tracking**
   - **Early:** Completed before scheduled time
   - **On Time:** Completed within scheduled window
   - **Over Time:** Completed after scheduled time

#### Schedule Optimization
- **ML Recommendations:** AI-suggested optimal schedules
- **Workload Balancing:** Even distribution of tasks
- **Peak Hour Alignment:** Schedule during high-traffic periods
- **Resource Coordination:** Align with supply availability

### Task Management

#### Task Assignment
1. **Define Task Parameters**
   - Task type (routine cleaning, deep cleaning, maintenance)
   - Priority level (low, medium, high, urgent)
   - Expected duration
   - Required resources

2. **Assignment Process**
   - Select available janitor
   - Set deadline and time constraints
   - Add specific instructions
   - Include location details

3. **Progress Monitoring**
   - Real-time status updates
   - Photo documentation (before/after)
   - Time tracking
   - Quality verification

#### Resource Usage Tracking
- **Supply Consumption:** Track materials used per task
- **Efficiency Metrics:** Resources used vs. recommended amounts
- **Waste Reduction:** Identify optimization opportunities
- **Cost Analysis:** Per-task resource costs

---

## 📦 Resource Management

### Inventory Overview

#### Resource Categories
- **Cleaning Supplies**
  - Water
  - Bleach (Toilet-specific)
  - Bleach (Walls & Floor)
  - Detergent
  - Disinfectants

- **Equipment & Tools**
  - Cleaning tools
  - Maintenance equipment
  - Safety gear
  - Replacement parts

#### Stock Level Monitoring
- **Current Inventory:** Real-time stock quantities
- **Status Indicators:**
  - 🟢 **Sufficient:** Adequate supply levels
  - 🟡 **Low Stock:** Approaching reorder point
  - 🔴 **Almost Out:** Critical low levels
  - ⚫ **Out of Stock:** Immediate restocking needed

### Automated Restocking System

#### Predictive Analytics
- **Usage Pattern Analysis:** ML algorithms predict consumption
- **Seasonal Adjustments:** Account for usage variations
- **Lead Time Optimization:** Factor in supplier delivery times
- **Budget Considerations:** Balance cost with availability

#### Alert Management
1. **Threshold Configuration**
   - Set minimum stock levels
   - Configure alert timing
   - Define escalation procedures

2. **Notification System**
   - Email alerts to administrators
   - Dashboard notifications
   - Mobile push notifications
   - SMS alerts for critical items

3. **Purchase Order Generation**
   - Automated PO creation
   - Vendor integration
   - Approval workflows
   - Delivery tracking

### Usage Analytics

#### Consumption Tracking
- **Real-Time Monitoring:** Live usage data from sensors
- **Historical Analysis:** Trend identification over time
- **Efficiency Metrics:** Actual vs. recommended usage
- **Cost Analysis:** Financial impact of consumption patterns

#### Optimization Recommendations
- **Usage Alerts:**
  - 🔴 **Excessive:** Above recommended levels
  - 🟢 **Normal:** Within optimal range
  - 🟡 **Below Average:** Potentially insufficient cleaning

---

## 📊 Usage Monitoring

### Real-Time Sensor Data

#### Environmental Monitoring
- **Temperature Tracking:** Ambient temperature readings
- **Humidity Levels:** Moisture content monitoring
- **Air Quality Index:** VOC and odor level detection
- **Occupancy Detection:** Real-time people counting

#### Facility Usage Analytics
- **Peak Hour Identification:** Busiest times of day
- **Usage Patterns:** Daily, weekly, monthly trends
- **Capacity Utilization:** Percentage of maximum occupancy
- **Duration Analysis:** Average visit times

### Historical Data Analysis

#### Trend Visualization
1. **Time Period Selection**
   - Hourly view for detailed analysis
   - Daily summaries for general patterns
   - Weekly comparisons for trend identification
   - Monthly reports for strategic planning

2. **Metric Customization**
   - Select specific sensors to display
   - Combine multiple data points
   - Apply filters for focused analysis
   - Export data for external analysis

#### Predictive Insights
- **Usage Forecasting:** ML predictions for future patterns
- **Maintenance Scheduling:** Optimal cleaning times
- **Resource Planning:** Predicted supply needs
- **Capacity Planning:** Space utilization optimization

---

## 📈 Reports & Analytics

### Dashboard Reports

#### Summarized Performance Reports
- **Period Selection:** Daily, weekly, monthly, yearly views
- **Metric Filtering:** Choose specific KPIs to display
- **Comparative Analysis:** Current vs. historical performance
- **Export Options:** PDF, Excel, or CSV formats

#### Custom Report Builder
1. **Select Data Sources**
   - User activity logs
   - Sensor readings
   - Task completion records
   - Resource usage data

2. **Configure Parameters**
   - Date range selection
   - User/location filters
   - Metric calculations
   - Visualization preferences

3. **Generate & Share**
   - Real-time report generation
   - Scheduled automated reports
   - Email distribution lists
   - Dashboard embedding

### Performance Analytics

#### Janitor Performance Reports
- **Individual Metrics:** Per-janitor performance analysis
- **Team Comparisons:** Relative performance rankings
- **Efficiency Trends:** Performance improvement tracking
- **Task Completion Rates:** Success metrics by task type

#### Resource Efficiency Analysis
- **Cost Per Clean:** Financial efficiency metrics
- **Waste Reduction:** Environmental impact tracking
- **Supply Optimization:** Usage vs. optimal recommendations
- **ROI Analysis:** Return on investment calculations

---

## ⚙️ Settings & Configuration

### User Preferences

#### Notification Settings
1. **Navigate to Settings**
   - Click the gear icon in navigation
   - Select "Notification Preferences"

2. **Configure Alert Types**
   ```
   Notification Categories:
   • Task Reminders
   • Resource Alerts
   • System Updates
   • Performance Reports
   • Emergency Notifications
   ```

3. **Delivery Methods**
   - **Email Notifications:** Professional updates
   - **Push Notifications:** Real-time mobile alerts
   - **SMS Alerts:** Critical emergency notifications
   - **Dashboard Badges:** Visual indicators

#### Theme Customization
- **Light Mode:** Standard daytime interface
- **Dark Mode:** Comfortable low-light viewing
- **Auto-Switch:** Automatic theme based on time
- **Custom Colors:** Organization branding options

#### Language & Localization
- **Language Selection:** Multi-language support
- **Date Format:** Regional date/time preferences
- **Number Format:** Decimal and currency settings
- **Timezone:** Local time zone configuration

### System Configuration (Admin/Superadmin)

#### Sensor Management
1. **Device Registration**
   - Add new sensors to the system
   - Configure sensor parameters
   - Set calibration schedules
   - Define alert thresholds

2. **Data Collection Settings**
   - Sampling frequency configuration
   - Data retention policies
   - Archive management
   - Privacy settings

#### User Management Policies
- **Registration Approval:** Automatic vs. manual approval
- **Password Policies:** Security requirements
- **Session Management:** Timeout and security settings
- **Role Permissions:** Fine-tune access controls

---

## 📱 Mobile Interface

### Mobile-Optimized Features

#### Responsive Design
- **Touch-Friendly Interface:** Large buttons and easy navigation
- **Swipe Gestures:** Intuitive mobile interactions
- **Offline Capability:** Essential functions work without internet
- **Fast Loading:** Optimized for mobile data speeds

#### Janitor Mobile Experience
1. **Quick Task Access**
   - Today's schedule at a glance
   - One-tap task status updates
   - Photo capture for documentation
   - Voice notes for detailed reports

2. **Mobile-Specific Features**
   - **GPS Integration:** Location verification
   - **Camera Integration:** Before/after photos
   - **Push Notifications:** Real-time task alerts
   - **Offline Sync:** Data synchronization when connected

#### Mobile Navigation
- **Hamburger Menu:** Collapsible navigation for small screens
- **Tab Navigation:** Quick switching between main sections
- **Floating Action Buttons:** Context-sensitive quick actions
- **Pull-to-Refresh:** Update data with simple gesture

### Mobile Best Practices

#### Data Usage Optimization
- **Compressed Images:** Reduced file sizes for faster loading
- **Selective Sync:** Download only essential data
- **Cached Content:** Offline access to recent information
- **Background Updates:** Efficient data synchronization

#### Battery Life Considerations
- **Optimized Refresh Rates:** Reduce unnecessary updates
- **Smart Notifications:** Batch alerts to minimize wake-ups
- **Location Services:** Use GPS only when necessary
- **Background Processing:** Minimal background activity

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Login Problems
**Issue:** Cannot log in to the system
**Solutions:**
1. **Check Credentials**
   - Verify email address spelling
   - Ensure correct password entry
   - Try "Forgot Password" if needed

2. **Account Status**
   - Confirm email verification completed
   - Check if admin approval is pending
   - Contact system administrator if account is locked

3. **Browser Issues**
   - Clear browser cache and cookies
   - Try incognito/private browsing mode
   - Update to latest browser version
   - Disable browser extensions temporarily

#### Performance Issues
**Issue:** System loading slowly or freezing
**Solutions:**
1. **Check Internet Connection**
   - Test internet speed and stability
   - Try refreshing the page
   - Close other bandwidth-heavy applications

2. **Browser Optimization**
   - Close unnecessary browser tabs
   - Clear browser cache
   - Restart browser application
   - Update browser to latest version

3. **Device Performance**
   - Close other applications
   - Restart device if necessary
   - Check available storage space
   - Update device operating system

#### Data Synchronization Issues
**Issue:** Real-time data not updating
**Solutions:**
1. **Refresh Data**
   - Use pull-to-refresh on mobile
   - Click refresh button on desktop
   - Log out and log back in

2. **Network Check**
   - Verify internet connectivity
   - Check firewall settings
   - Test on different network if available

3. **Contact Support**
   - Report persistent issues to IT support
   - Provide specific error messages
   - Include screenshots if helpful

#### Mobile App Issues
**Issue:** Mobile interface not working properly
**Solutions:**
1. **App Updates**
   - Check for available app updates
   - Update to latest version
   - Restart app after updating

2. **Device Compatibility**
   - Verify device meets minimum requirements
   - Check operating system version
   - Ensure adequate storage space

3. **Reset App Data**
   - Clear app cache (Android)
   - Offload and reinstall app (iOS)
   - Reset app permissions if needed

### Emergency Procedures

#### System Outage
1. **Immediate Actions**
   - Check system status page
   - Verify local internet connection
   - Contact IT support team
   - Switch to backup procedures if available

2. **Continued Operations**
   - Use manual logging procedures
   - Document tasks on paper
   - Take photos for later upload
   - Update system when service restored

#### Data Loss Prevention
1. **Regular Backups**
   - System automatically backs up data
   - Users should save work frequently
   - Export important reports regularly

2. **Recovery Procedures**
   - Contact system administrator immediately
   - Provide details of lost data
   - Assist with recovery verification

### Getting Help

#### Support Channels
- **Help Desk:** [Support Phone Number]
- **Email Support:** [Support Email Address]
- **Online Documentation:** Available within system
- **Training Materials:** Video tutorials and guides

#### Best Practices for Support Requests
1. **Provide Detailed Information**
   - Describe what you were doing when issue occurred
   - Include exact error messages
   - Specify browser and device type
   - Mention if issue is reproducible

2. **Include Screenshots**
   - Capture error messages
   - Show what you're seeing on screen
   - Highlight problematic areas

3. **Be Available for Follow-up**
   - Respond promptly to support requests
   - Test suggested solutions
   - Confirm when issues are resolved

---

## 📞 Support & Contact Information

### Technical Support
- **Email:** tech-support@tup.edu.ph
- **Phone:** [Support Phone Number]
- **Hours:** Monday - Friday, 8:00 AM - 5:00 PM (GMT+8)

### Academic Supervisor
- **Name:** Prof. Aimee Acoba
- **Department:** Electronics Department
- **Institution:** Technological University of the Philippines, Manila
- **Email:** aimee_acoba@tup.edu.ph

### System Administration
- **Primary Admin:** [Admin Name]
- **Email:** [Admin Email]
- **Emergency Contact:** [Emergency Number]

---

*This user guide is updated regularly. For the latest version, please check the system documentation section or contact your system administrator.*

**Document Version:** 1.0  
**Last Updated:** [Current Date]  
**Next Review:** [Next Review Date]
