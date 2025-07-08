# Smart Restroom: Preventive Maintenance System Using Machine Learning Algorithm

## 🎓 Academic Project Information

**Thesis Title:** Smart Restroom: Preventive Maintenance System Using Machine Learning Algorithm  
**Degree:** Bachelor of Engineering Technology (Major in Computer Engineering Technology)  
**Institution:** Technological University of the Philippines, Manila  
**Date:** May 2025  

### 👥 Research Team
- **Santos, Rafaella** - Lead Developer & ML Engineer
- **Infante, Charlin** - Hardware Integration Specialist  
- **Magdalita, Ryan Rey** - Backend Developer & Database Administrator
- **Mission, Joey Boy** - Frontend Developer & UI/UX Designer
- **Pontanos, John Michael** - System Architect & Quality Assurance

## 📋 Abstract

The Smart Restroom Preventive Maintenance System addresses inefficiencies in traditional restroom management through a data-driven approach using machine learning algorithms. This system leverages real-time sensor data, predictive analytics, and automated resource management to enhance hygiene standards, reduce operational costs, and improve user satisfaction in public facilities.

## 🎯 Research Objectives

### Primary Objectives
1. **Accurate Monitoring and Data Collection**: Develop a comprehensive sensor network for real-time data gathering including occupancy, temperature, odor levels, and resource consumption
2. **Preventive Maintenance Platform**: Create an analytics platform employing machine learning algorithms (SVM, Random Forest, Decision Tree) to predict maintenance requirements
3. **Resource Management System**: Design an integrated hardware-software system for efficient resource allocation and automated maintenance scheduling

### Research Questions
- How can machine learning algorithms improve predictive maintenance accuracy in restroom facilities?
- What sensor combinations provide optimal data for maintenance prediction?
- How does automated resource management impact operational efficiency and cost reduction?

## 🔬 Research Methodology

### Development Approach
- **Methodology:** Agile Development with iterative phases
- **Testing Framework:** ISO 25010 Quality Standards
- **Evaluation Method:** Likert Scale (1-5) assessment with maintenance staff feedback
- **Environment:** Controlled testing in 4th-floor female restroom, TUP Manila

### Machine Learning Algorithms
- **Support Vector Machines (SVM)** - Primary classification algorithm (Precision: ~0.59)
- **Random Forest** - Ensemble learning for robust predictions
- **Decision Tree** - Interpretable decision-making model
- **Linear Regression** - Resource consumption prediction

## 🏗️ System Architecture

### Hardware Components
- **Central Processing Unit:** Raspberry Pi 5
- **Sensor Controller:** Arduino Mega 2560
- **Sensors:**
  - PIR Motion Sensors (Occupancy Detection)
  - DHT22 (Temperature & Humidity)
  - MQ-135 (Air Quality & Odor Detection)
  - Ultrasonic Sensors (Resource Level Monitoring)
- **Actuators:**
  - Liquid Dispensing Pumps
  - Exhaust Fans
  - LED Indicator Systems

### Software Stack
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Real-time sensor data & analytics)
- **Frontend:** React.js + TailwindCSS + Shadcn/UI
- **Machine Learning:** Python (scikit-learn, pandas, numpy)
- **Real-time Communication:** WebSocket
- **Authentication:** JWT with role-based access control

### System Integration
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Sensor Layer  │ -> │  Processing Hub  │ -> │  Web Dashboard  │
│                 │    │  (Raspberry Pi)  │    │                 │
│ • PIR Sensors   │    │ • Data Analysis  │    │ • Admin Panel   │
│ • Temperature   │    │ • ML Algorithms  │    │ • Janitor App   │
│ • Air Quality   │    │ • Automation     │    │ • Analytics     │
│ • Resource      │    │ • Notifications  │    │ • Reports       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Features & Functionality

### 🔐 User Management System
- **Multi-Role Authentication**: Admin, Janitor, Maintenance Staff
- **User Registration**: Account creation with role assignment and email verification
- **Profile Management**: Complete user profile with image upload capabilities
- **Session Management**: Auto-logout with inactivity detection

### 📊 Dashboard & Analytics
- **Real-time Monitoring**: Live sensor data visualization
- **Predictive Analytics**: ML-driven maintenance scheduling
- **Resource Tracking**: Automated inventory management
- **Performance Metrics**: Comprehensive KPI dashboard

#### Key Metrics Tracked:
- **Usage Peak Hours**: ML analysis of highest facility usage periods
- **Cleaning Efficiency**: Performance tracking and optimization
- **Resource Consumption**: Predictive restocking algorithms
- **Environmental Quality**: Air quality and comfort monitoring

### 📈 Machine Learning & Predictions
- **Occupancy Prediction**: Forecast peak usage times
- **Maintenance Scheduling**: Predictive maintenance based on usage patterns
- **Resource Optimization**: Automated supply management
- **Anomaly Detection**: Identify unusual patterns requiring attention

### 🛠️ Maintenance Management
- **Janitor Scheduling**: Intelligent shift planning and task assignment
- **Work Order System**: Automated maintenance request generation
- **Performance Tracking**: Individual and team efficiency monitoring
- **Resource Allocation**: Smart distribution of cleaning supplies

### 📱 Mobile-Responsive Interface
- **Cross-Platform Compatibility**: Optimized for desktop, tablet, and mobile
- **Touch-Friendly Design**: Intuitive interface for field personnel
- **Offline Capability**: Essential functions available without internet
- **Real-time Notifications**: Push notifications for urgent maintenance needs

### 🔧 Hardware Integration Features
- **Sensor Calibration**: Automated sensor accuracy maintenance
- **Device Health Monitoring**: Real-time hardware status tracking
- **Remote Diagnostics**: System health monitoring and troubleshooting
- **Firmware Updates**: Over-the-air updates for connected devices

## 📊 Research Results & Validation

### Performance Metrics
- **System Reliability**: 99.2% uptime during testing period
- **Prediction Accuracy**: 59% precision with SVM algorithm
- **User Satisfaction**: 4.85-4.9 weighted mean rating (Excellent)
- **Cost Reduction**: 30% decrease in unnecessary maintenance visits

### ISO 25010 Evaluation Results
- **Functional Suitability**: 4.9/5.0
- **Performance Efficiency**: 4.85/5.0  
- **Usability**: 4.9/5.0
- **Reliability**: 4.88/5.0
- **Maintainability**: 4.87/5.0

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18.0 or higher)
- MongoDB (v6.0 or higher)
- Python 3.8+ (for ML components)
- Raspberry Pi OS (for hardware setup)

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/your-repo/smart-restroom-system.git
cd smart-restroom-system

# Install backend dependencies
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Configure MongoDB URI, JWT secrets, and SendGrid API keys

# Start the backend server
npm run dev
```

### Frontend Setup
```bash
# Install frontend dependencies
cd frontend
npm install

# Start the development server
npm start
```

### Machine Learning Setup
```bash
# Install Python dependencies
cd ml-algorithms
pip install -r requirements.txt

# Run initial model training
python train_models.py

# Start the ML prediction service
python prediction_service.py
```

### Hardware Setup
```bash
# On Raspberry Pi
sudo apt update && sudo apt upgrade
sudo apt install python3-pip nodejs npm

# Install GPIO libraries
pip3 install RPi.GPIO adafruit-circuitpython-dht

# Clone and setup hardware scripts
git clone https://github.com/your-repo/hardware-scripts.git
cd hardware-scripts
python3 sensor_setup.py
```

## 📁 Project Structure
```
smart-restroom-system/
├── backend/                 # Node.js API server
│   ├── controllers/         # Business logic
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication & validation
│   └── utils/              # Helper functions
├── frontend/               # React.js dashboard
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application views
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Frontend utilities
├── ml-algorithms/          # Machine learning components
│   ├── models/             # Trained ML models
│   ├── training/           # Model training scripts
│   └── prediction/         # Real-time prediction service
├── hardware/               # Raspberry Pi & Arduino code
│   ├── sensors/            # Sensor reading scripts
│   ├── actuators/          # Device control scripts
│   └── communication/      # Data transmission
└── documentation/          # Technical documentation
```

## 🔬 Research Contributions

### Novel Contributions
1. **Integrated IoT-ML Framework**: First comprehensive system combining multiple sensor types with machine learning for restroom maintenance
2. **Multi-Algorithm Approach**: Comparative analysis of SVM, Random Forest, and Decision Tree algorithms for maintenance prediction
3. **Real-time Automation**: Seamless integration of predictive analytics with automated response systems

### Academic Impact
- Advancement in preventive maintenance methodologies for public facilities
- Contribution to smart building and IoT research
- Framework for sustainable facility management systems

## 🔮 Future Enhancements

### Immediate Improvements
- **Advanced Sensor Integration**: Noise level and virus detection capabilities
- **Enhanced Input Module**: Improved data collection responsiveness
- **Adaptive Learning**: Self-learning algorithms for dynamic prediction adjustment

### Long-term Vision
- **Multi-Facility Deployment**: Scalable system for building-wide implementation
- **Integration with BMS**: Connection with existing Building Management Systems
- **User Feedback Integration**: Direct user input for service quality improvement
- **Predictive Health Monitoring**: Early detection of facility-related health issues

## 📄 Research Publications & Documentation

### Thesis Documentation
- **Chapter 1**: Introduction and Problem Statement
- **Chapter 2**: Literature Review and Conceptual Framework  
- **Chapter 3**: Research Methodology and System Design
- **Chapter 4**: Results and Discussion
- **Chapter 5**: Conclusions and Recommendations

### Technical Documentation
- API Documentation: `/docs/api.md`
- Hardware Setup Guide: `/docs/hardware.md`
- ML Model Documentation: `/docs/machine-learning.md`
- User Manual: `/docs/user-guide.md`

## 📊 Performance Benchmarks

### System Metrics
- **Response Time**: < 200ms for dashboard updates
- **Data Processing**: Real-time sensor data processing (< 1s latency)
- **Prediction Speed**: Maintenance predictions generated in < 5s
- **Accuracy**: 59% prediction accuracy with continuous improvement

### Resource Requirements
- **Memory Usage**: 512MB RAM minimum for Raspberry Pi
- **Storage**: 32GB SD card minimum for data logging
- **Network**: 10Mbps internet connection for cloud synchronization
- **Power**: 5V/3A power supply for stable operation

## 🤝 Contributing

This project was developed as part of academic research. For collaboration opportunities or research partnerships, please contact the research team through the Technological University of the Philippines.

### Development Guidelines
1. Follow Agile methodology principles
2. Maintain ISO 25010 quality standards
3. Document all code changes and improvements
4. Test thoroughly before deployment
5. Ensure security and privacy compliance

## 📞 Contact & Support

**Academic Supervisor**: Aimee Acoba  
**Institution**: Technological University of the Philippines, Manila  
**Department**: Electronics Department  
**Email**: aimee_acoba@tup.edu.ph

## 📄 License

This project is developed for academic research purposes under the Technological University of the Philippines. All rights reserved.

---

**Citation**: Santos, R., Infante, C., Magdalita, R.R., Mission, J.B., & Pontanos, J.M. (2025). *Smart Restroom: Preventive Maintenance System Using Machine Learning Algorithm*. Bachelor's Thesis, Technological University of the Philippines, Manila.
