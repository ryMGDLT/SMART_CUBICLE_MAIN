# API Documentation - Smart Restroom Preventive Maintenance System

**Academic Context**: Bachelor's Thesis Project  
**Institution**: Technological University of the Philippines - Manila  
**Course**: Electronics Engineering Department  
**Thesis Title**: "Smart Restroom: Preventive Maintenance System Using Machine Learning Algorithm"  
**Supervisor**: Prof. Aimee Acoba  
**Submission Date**: May 2025  

**Team Members**:
- Santos, Rafaella (Lead Developer & ML Engineer)  
- Infante, Charlin (Hardware Integration Specialist)  
- Magdalita, Ryan Rey (Backend Developer & Database Administrator)  
- Mission, Joey Boy (Frontend Developer & UI/UX Designer)  
- Pontanos, John Michael (System Architect & Quality Assurance)  

---

## Table of Contents

1. [API Overview](#api-overview)
2. [Authentication & Authorization](#authentication--authorization)
3. [Base Configuration](#base-configuration)
4. [User Management API](#user-management-api)
5. [Janitor Management API](#janitor-management-api)
6. [Notification System API](#notification-system-api)
7. [WebSocket Integration](#websocket-integration)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)
10. [Data Models](#data-models)
11. [Security Implementation](#security-implementation)
12. [API Testing](#api-testing)

---

## API Overview

### System Architecture
The Smart Restroom API is built using the **MERN stack** with the following core technologies:

- **Backend Framework**: Node.js + Express.js
- **Database**: MongoDB Atlas (Cloud)
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Communication**: WebSocket
- **File Upload**: Multer middleware
- **Email Service**: SendGrid
- **Security**: bcrypt, CORS, Rate Limiting

### API Design Principles
- **RESTful Architecture**: Standard HTTP methods and status codes
- **Role-Based Access Control**: Multi-tier permission system
- **Stateless Authentication**: JWT token-based sessions
- **Real-time Updates**: WebSocket for live notifications
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Standardized error responses

### Base URL Structure
```
Production: https://smart-restroom-api.herokuapp.com
Development: http://localhost:5000
Local Network: http://[LOCAL_IP]:5000
```

---

## Authentication & Authorization

### Authentication Flow
The system implements a secure multi-step authentication process:

1. **User Registration** → Email Verification → Admin Approval → Account Activation
2. **JWT Token Generation** → Role-based Access Control
3. **Session Management** → Token Refresh (1-hour expiration)

### Role Hierarchy
```
Superadmin > Admin > Janitor > User
```

#### Role Permissions:
- **Superadmin**: Full system access, user management, system configuration
- **Admin**: User management, janitor supervision, reports, notifications
- **Janitor**: Schedule management, task updates, resource tracking
- **User**: Profile management, basic system interaction

### JWT Token Structure
```json
{
  "id": "user_mongodb_objectid",
  "role": "Admin|Superadmin|Janitor|User",
  "iat": 1703123456,
  "exp": 1703127056
}
```

### Authentication Headers
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## Base Configuration

### Environment Variables
```env
# Database Configuration
MONGO_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Authentication
JWT_SECRET=your_jwt_secret_key

# Email Service
SENDGRID_API_KEY=SG.your_sendgrid_api_key
FROM_EMAIL=noreply@smartrestroom.com

# Server Configuration
FRONTEND_BASE_URL=http://localhost:3000
NODE_ENV=development|production
```

### CORS Configuration
```javascript
cors({
  origin: ["http://localhost:3000", "http://[LOCAL_IP]:3000"],
  credentials: true
})
```

---

## User Management API

### Base Route: `/users`

#### 1. User Registration
```http
POST /users/signup
Content-Type: application/json
Rate Limit: 5 requests per 15 minutes
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "StrongPass123!",
  "confirmPassword": "StrongPass123!",
  "employeeId": "TUPM-21-1234",
  "contactNumber": "+639123456789",
  "role": "User"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one digit
- At least one special character (@$!%*?&)

**Response:**
```json
{
  "message": "User created successfully. Please check your email to verify your account."
}
```

**Employee ID Format:** `TUPM-XX-XXXX` (e.g., TUPM-21-1234)

#### 2. User Login
```http
POST /users/login
Content-Type: application/json
Rate Limit: 5 requests per 15 minutes
```

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "StrongPass123!"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8b2c1a2b3c4d5e6f78901",
    "fullName": "John Doe",
    "username": "John",
    "email": "john.doe@example.com",
    "profileImage": "",
    "role": "User",
    "status": "Accepted",
    "verified": true,
    "notificationsEnabled": true
  }
}
```

#### 3. Email Verification
```http
POST /users/verify-email
Content-Type: application/json
```

**Request Body:**
```json
{
  "token": "verification_token_from_email"
}
```

#### 4. Resend Verification Email
```http
POST /users/resend-verification-email
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john.doe@example.com"
}
```

#### 5. Password Reset Flow

**Forgot Password:**
```http
POST /users/forgot-password
Content-Type: application/json
Rate Limit: 5 requests per 15 minutes
```

**Request Body:**
```json
{
  "email": "john.doe@example.com"
}
```

**Reset Password:**
```http
POST /users/reset-password
Content-Type: application/json
```

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewStrongPass123!"
}
```

#### 6. Get All Users (Protected)
```http
GET /users
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by status (Pending, Accepted, Declined)
- `role`: Filter by role

**Response:**
```json
{
  "users": [
    {
      "id": "64f8b2c1a2b3c4d5e6f78901",
      "fullName": "John Doe",
      "username": "John",
      "email": "john.doe@example.com",
      "employeeId": "TUPM-21-1234",
      "contactNumber": "+639123456789",
      "role": "User",
      "status": "Accepted",
      "verified": true,
      "profileImage": "",
      "createdAt": "2023-12-01T10:00:00.000Z",
      "updatedAt": "2023-12-01T10:00:00.000Z"
    }
  ],
  "totalUsers": 50,
  "currentPage": 1,
  "totalPages": 5
}
```

#### 7. Get User by ID (Protected)
```http
GET /users/:id
Authorization: Bearer <jwt_token>
```

#### 8. Update User (Protected)
```http
PUT /users/:id
PATCH /users/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "fullName": "John Updated Doe",
  "contactNumber": "+639987654321",
  "notificationsEnabled": false
}
```

#### 9. Delete User (Protected)
```http
DELETE /users/:id
Authorization: Bearer <jwt_token>
```

#### 10. Accept User (Admin Only)
```http
PUT /users/:id/accept
Authorization: Bearer <jwt_token>
```

#### 11. Decline User (Admin Only)
```http
PUT /users/:id/decline
Authorization: Bearer <jwt_token>
```

#### 12. Upload Profile Image (Protected)
```http
POST /users/:id/upload-profile-image
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Form Data:**
```
profileImage: [image_file]
```

**Supported Formats:** JPG, JPEG, PNG, GIF  
**Max File Size:** 5MB  

#### 13. Change Password (Protected)
```http
POST /users/:id/change-password
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!",
  "confirmNewPassword": "NewPassword123!"
}
```

---

## Janitor Management API

### Base Route: `/janitors`

#### 1. Get All Janitors
```http
GET /janitors
```

**Response:**
```json
[
  {
    "_id": "64f8b2c1a2b3c4d5e6f78901",
    "userId": "64f8b2c1a2b3c4d5e6f78902",
    "basicDetails": {
      "image": "profile.jpg",
      "name": "Jane Smith",
      "employeeId": "TUPM-21-5678",
      "email": "jane.smith@tupm.edu.ph",
      "contact": "+639123456789"
    },
    "schedule": [...],
    "performanceTrack": [...],
    "resourceUsage": [...],
    "logsReport": [...],
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z"
  }
]
```

#### 2. Get Janitor by ID
```http
GET /janitors/:id
```

#### 3. Create New Janitor
```http
POST /janitors
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "64f8b2c1a2b3c4d5e6f78902",
  "basicDetails": {
    "image": "",
    "name": "Jane Smith",
    "employeeId": "TUPM-21-5678",
    "email": "jane.smith@tupm.edu.ph",
    "contact": "+639123456789"
  },
  "schedule": [],
  "performanceTrack": [],
  "resourceUsage": [],
  "logsReport": []
}
```

#### 4. Update Janitor
```http
PATCH /janitors/:id
Content-Type: application/json
```

**Schedule Entry Example:**
```json
{
  "schedule": [
    {
      "image": "profile.jpg",
      "name": "Jane Smith",
      "date": "2023-12-01",
      "shift": "Morning",
      "timeIn": "08:00",
      "timeOut": "16:00",
      "cleaningHour": "2.5",
      "task": "Restroom Maintenance",
      "status": "On Time"
    }
  ]
}
```

**Performance Track Example:**
```json
{
  "performanceTrack": [
    {
      "image": "profile.jpg",
      "name": "Jane Smith",
      "today": 8,
      "thisWeek": 40,
      "thisMonth": 160,
      "thisYear": 1920,
      "maxCleaningHour": 10,
      "minCleaningHour": 6,
      "status": "Excellent",
      "employeeId": "TUPM-21-5678"
    }
  ]
}
```

**Resource Usage Example:**
```json
{
  "resourceUsage": [
    {
      "image": "profile.jpg",
      "name": "Jane Smith",
      "resource": "Toilet Paper",
      "amountUsed": "5 rolls",
      "remaining": "15 rolls",
      "restocked": false,
      "note": "Low stock alert",
      "employeeId": "TUPM-21-5678"
    }
  ]
}
```

**Logs Report Example:**
```json
{
  "logsReport": [
    {
      "image": "profile.jpg",
      "name": "Jane Smith",
      "date": "2023-12-01",
      "startTime": "08:00",
      "endTime": "10:30",
      "duration": 2.5,
      "task": "Deep Cleaning",
      "beforePicture": "before_img.jpg",
      "afterPicture": "after_img.jpg",
      "status": "Completed"
    }
  ]
}
```

#### 5. Update Schedule Status
```http
PUT /janitors/:id/schedule/status
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "Early|On Time|Over Time"
}
```

#### 6. Delete Janitor
```http
DELETE /janitors/:id
```

---

## Notification System API

### Base Route: `/notifications`
**Required Role:** Admin or Superadmin

#### 1. Get Notifications
```http
GET /notifications
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "_id": "64f8b2c1a2b3c4d5e6f78903",
    "message": "New User john.doe@example.com signed up! Go to users page to assign role and accept the user",
    "userId": "64f8b2c1a2b3c4d5e6f78901",
    "recipientId": "64f8b2c1a2b3c4d5e6f78904",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "read": false
  }
]
```

#### 2. Mark Notifications as Read
```http
POST /notifications/mark-read
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Notifications marked as read"
}
```

#### 3. Clear All Notifications
```http
DELETE /notifications/clear
Authorization: Bearer <jwt_token>
```

#### 4. Toggle Single Notification Read Status
```http
PATCH /notifications/:id/toggle-read
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "read": true
}
```

---

## WebSocket Integration

### Real-time Notification Streaming

#### Connection Setup
```javascript
const wsUrl = `ws://localhost:5000?token=${jwtToken}`;
const ws = new WebSocket(wsUrl);

ws.onopen = function(event) {
    console.log('WebSocket connected');
};

ws.onmessage = function(event) {
    const notification = JSON.parse(event.data);
    console.log('New notification:', notification);
};

ws.onclose = function(event) {
    console.log('WebSocket disconnected:', event.code, event.reason);
};
```

#### Authentication Requirements
- **JWT Token**: Required as query parameter
- **Role Restriction**: Admin or Superadmin only
- **Auto-disconnect**: Invalid tokens result in immediate disconnection

#### Notification Streaming
- **Polling Interval**: 5 seconds
- **New Notifications**: Sent within 1 minute of creation
- **Auto-cleanup**: Connection cleanup on client disconnect

---

## Error Handling

### Standard Error Response Format
```json
{
  "message": "Error description",
  "error": "Detailed error information",
  "statusCode": 400,
  "timestamp": "2023-12-01T10:00:00.000Z"
}
```

### Common HTTP Status Codes

#### 2xx Success
- **200 OK**: Request successful
- **201 Created**: Resource created successfully

#### 4xx Client Errors
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Duplicate resource (email/employeeId)
- **422 Unprocessable Entity**: Validation errors
- **429 Too Many Requests**: Rate limit exceeded

#### 5xx Server Errors
- **500 Internal Server Error**: Unexpected server error
- **503 Service Unavailable**: Database connection issues

### Validation Errors

#### Email Validation
```json
{
  "message": "Please provide a valid email",
  "field": "email",
  "value": "invalid-email"
}
```

#### Employee ID Validation
```json
{
  "message": "Employee ID must follow the format TUPM-XX-XXXX",
  "field": "employeeId",
  "value": "INVALID-FORMAT"
}
```

#### Password Strength
```json
{
  "message": "Password is not strong enough",
  "requirements": [
    "Minimum 8 characters",
    "At least one uppercase letter",
    "At least one lowercase letter", 
    "At least one digit",
    "At least one special character"
  ]
}
```

---

## Rate Limiting

### Authentication Endpoints
```
Limit: 5 requests per 15 minutes per IP
Applies to:
- POST /users/login
- POST /users/signup  
- POST /users/forgot-password
```

### Rate Limit Headers
```http
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1703127056
```

### Rate Limit Exceeded Response
```json
{
  "message": "Too many requests from this IP. Please try again later.",
  "retryAfter": 900
}
```

---

## Data Models

### User Schema
```javascript
{
  username: String (unique, trim),
  fullName: String (required, trim),
  password: String (required, minlength: 8, hashed),
  employeeId: String (required, unique, format: TUPM-XX-XXXX),
  contactNumber: String (required, trim),
  email: String (required, unique, lowercase, validated),
  role: String (enum: ["Admin", "User", "Janitor", "Superadmin"], default: "User"),
  status: String (enum: ["Pending", "Accepted", "Declined"], default: "Pending"),
  profileImage: String (default: ""),
  verificationToken: String (unique, sparse),
  verificationTokenExpiresAt: Date,
  verified: Boolean (default: false),
  notificationsEnabled: Boolean (default: true),
  timestamps: true
}
```

### Janitor Schema
```javascript
{
  _id: ObjectId (required),
  userId: ObjectId (required, ref: "User"),
  basicDetails: {
    image: String (default: ""),
    name: String (required),
    employeeId: String (required, unique),
    email: String (required, unique),
    contact: String (required)
  },
  schedule: Array[ScheduleEntry],
  performanceTrack: Array[PerformanceEntry],
  resourceUsage: Array[ResourceEntry],
  logsReport: Array[LogEntry],
  timestamps: true
}
```

### Notification Schema
```javascript
{
  message: String (required),
  userId: ObjectId (ref: "User", required),
  recipientId: ObjectId (ref: "User"),
  createdAt: Date (default: Date.now),
  read: Boolean (default: false)
}
```

---

## Security Implementation

### Password Security
- **Hashing Algorithm**: bcrypt with salt rounds: 10
- **Minimum Requirements**: 8 characters, mixed case, numbers, special characters
- **Storage**: Never store plain text passwords

### JWT Security
- **Secret Key**: Environment variable (JWT_SECRET)
- **Expiration**: 1 hour
- **Algorithm**: HS256
- **Payload**: Minimal user data (id, role)

### Input Validation
- **Email Format**: RFC 5322 compliant
- **Employee ID**: Strict format validation (TUPM-XX-XXXX)
- **SQL Injection**: MongoDB inherent protection
- **XSS Prevention**: Input sanitization

### File Upload Security
- **File Type Validation**: Image files only (JPG, JPEG, PNG, GIF)
- **File Size Limit**: 5MB maximum
- **Path Traversal Prevention**: Secure file naming
- **Virus Scanning**: Recommended for production

### CORS Configuration
- **Allowed Origins**: Specified domains only
- **Credentials**: Enabled for authentication
- **Methods**: Limited to required HTTP methods

---

## API Testing

### Testing Environment Setup
```bash
# Install dependencies
npm install

# Environment setup
cp .env.example .env
# Configure MongoDB Atlas URI, JWT_SECRET, SendGrid API key

# Start development server
npm run dev

# Run tests
npm test
```

### Postman Collection Structure
```
Smart Restroom API/
├── Authentication/
│   ├── User Signup
│   ├── User Login
│   ├── Email Verification
│   └── Password Reset
├── User Management/
│   ├── Get All Users
│   ├── Get User by ID
│   ├── Update User
│   └── Delete User
├── Janitor Management/
│   ├── Get All Janitors
│   ├── Create Janitor
│   ├── Update Janitor
│   └── Update Schedule Status
└── Notifications/
    ├── Get Notifications
    ├── Mark as Read
    └── Clear Notifications
```

### Sample API Tests

#### User Authentication Test
```javascript
// Test: User Registration
POST /users/signup
{
  "fullName": "Test User",
  "email": "test@example.com",
  "password": "TestPass123!",
  "confirmPassword": "TestPass123!",
  "employeeId": "TUPM-21-9999",
  "contactNumber": "+639123456789",
  "role": "User"
}

// Expected: 201 Created
// Response: Success message with verification instruction
```

#### Authentication Header Test
```javascript
// Test: Protected Route Access
GET /users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Expected: 200 OK with user list
// Or 401 Unauthorized if token is invalid
```

### Load Testing Recommendations
- **Concurrent Users**: Test with 100+ simultaneous connections
- **Database Performance**: Monitor query execution times
- **Memory Usage**: Track Node.js memory consumption
- **Response Times**: Target <200ms for API endpoints

### Performance Metrics
- **API Response Time**: Average <120ms
- **Database Query Time**: <50ms per query
- **File Upload Speed**: 1MB/second minimum
- **WebSocket Latency**: <100ms for real-time updates

---

## Academic Research Integration

### ISO 25010 Compliance
The API design follows software quality characteristics:

- **Functional Suitability**: 4.9/5.0 - Complete feature coverage
- **Performance Efficiency**: 4.85/5.0 - Optimized response times
- **Compatibility**: 4.9/5.0 - Cross-platform support
- **Usability**: 4.85/5.0 - Developer-friendly design
- **Reliability**: 4.9/5.0 - 99.2% uptime achievement
- **Security**: 4.9/5.0 - Comprehensive protection measures
- **Maintainability**: 4.85/5.0 - Clean, documented code
- **Portability**: 4.9/5.0 - Cloud-native architecture

### Machine Learning Integration
- **Sensor Data Ingestion**: Real-time IoT data processing
- **Predictive Analytics**: ML model inference endpoints
- **Performance Optimization**: Algorithm-driven scheduling
- **Anomaly Detection**: Automated issue identification

### Hardware Integration Points
- **Raspberry Pi Communication**: RESTful sensor data endpoints
- **Arduino Data Processing**: Real-time hardware status updates
- **IoT Device Management**: Device registration and monitoring
- **Edge Computing Interface**: Local processing coordination

---

## Contact Information

### Development Team
**Lead Developer & ML Engineer**: Rafaella Santos  
**Backend Developer & Database Administrator**: Ryan Rey Magdalita  
**Frontend Developer & UI/UX Designer**: Joey Boy Mission  
**System Architect & Quality Assurance**: John Michael Pontanos  
**Hardware Integration Specialist**: Charlin Infante  

### Academic Supervisor
**Prof. Aimee Acoba**  
Electronics Engineering Department  
Technological University of the Philippines - Manila  
Email: aimee.acoba@tup.edu.ph  

### Technical Support
For API-related inquiries, please contact the development team through the official thesis project channels.

---

*This documentation is part of the Bachelor's thesis project "Smart Restroom: Preventive Maintenance System Using Machine Learning Algorithm" submitted to TUP Manila, Electronics Engineering Department, under the supervision of Prof. Aimee Acoba, May 2025.*
