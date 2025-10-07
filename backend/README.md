# Prescripto Backend API

## 🎯 Overview
The Prescripto Backend is a robust Node.js/Express API server that powers the healthcare platform. It provides secure endpoints for user authentication, appointment management, doctor/patient administration, and file uploads with comprehensive data validation and security measures.

## 🚀 Features

### 🔐 **Authentication & Authorization**
- **Multi-Role Authentication**: Admin, Doctor, and Patient login systems
- **JWT Token Management**: Secure token-based authentication
- **Password Security**: Bcrypt hashing with salt rounds
- **Role-Based Access Control**: Protected routes with middleware
- **Session Management**: Token validation and expiry handling

### 🏥 **Doctor Management**
- **Doctor Registration**: Complete profile creation with documents
- **Doctor Approval System**: Admin approval workflow
- **Profile Management**: Update doctor information and credentials
- **Availability Management**: Schedule and slot management
- **Document Upload**: Medical licenses and certificates
- **Password Management**: Secure password reset functionality

### 👥 **Patient Management** *(New Feature)*
- **Patient Registration**: User account creation
- **Profile Management**: Personal and medical information
- **Patient List API**: Admin access to all patients
- **Password Reset**: Admin-controlled password changes
- **Search & Filter**: Multi-field patient search
- **Data Security**: Protected patient information

### 📅 **Appointment System**
- **Appointment Booking**: Slot-based appointment scheduling
- **Status Management**: Pending, confirmed, completed, cancelled states
- **Doctor-Patient Matching**: Intelligent appointment assignment
- **Calendar Integration**: Date and time slot management
- **Appointment History**: Complete booking records
- **Real-time Updates**: Live status synchronization

### 📁 **File Management**
- **Image Upload**: Profile pictures and medical images
- **Document Storage**: Medical licenses, certificates
- **Cloudinary Integration**: Cloud-based file storage
- **File Validation**: Type and size restrictions
- **Secure URLs**: Protected file access

### 📊 **Analytics & Reporting**
- **Dashboard Data**: System-wide statistics
- **Doctor Analytics**: Performance metrics
- **Patient Statistics**: Registration and activity data
- **Appointment Metrics**: Booking and completion rates

## 🛠 Technology Stack

### Core Framework
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Token authentication

### Security & Validation
- **bcrypt**: Password hashing and verification
- **validator**: Email and data validation
- **CORS**: Cross-Origin Resource Sharing
- **Helmet**: Security headers middleware

### File Handling
- **Multer**: Multipart/form-data file uploads
- **Cloudinary**: Cloud-based image and file storage
- **File Type Validation**: Secure file upload handling

### Development Tools
- **Nodemon**: Development server auto-restart
- **dotenv**: Environment variable management
- **ESLint**: Code quality and style checking

## 📁 Project Structure

```
backend/
├── config/                 # Configuration files
│   ├── cloudinary.js      # Cloudinary setup
│   └── mongodb.js         # MongoDB connection
├── controllers/           # Business logic controllers
│   ├── adminController.js     # Admin operations
│   ├── doctorController.js    # Doctor management
│   └── userController.js      # Patient/user operations
├── middleware/           # Express middleware
│   ├── authAdmin.js      # Admin authentication
│   ├── authDoctor.js     # Doctor authentication
│   ├── authUser.js       # User authentication
│   └── multer.js         # File upload handling
├── models/              # MongoDB schemas
│   ├── appointmentModel.js   # Appointment schema
│   ├── doctorModel.js        # Doctor profile schema
│   └── userModel.js          # User/patient schema
├── routes/              # API route definitions
│   ├── adminRoute.js     # Admin endpoints
│   ├── doctorRoute.js    # Doctor endpoints
│   └── userRoute.js      # User/patient endpoints
├── uploads/             # Local file storage
├── test files/          # API testing utilities
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Dependencies and scripts
└── server.js           # Main application entry
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account (for file storage)

### Installation Steps
1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file with:
   ```env
   MONGODB_URI=mongodb://localhost:27017/prescripto
   JWT_SECRET=your_jwt_secret_key
   ADMIN_EMAIL=admin@prescripto.com
   ADMIN_PASSWORD=admin123
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_SECRET_KEY=your_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```

5. **Verify installation**
   - Server runs on `http://localhost:4000`
   - MongoDB connection established
   - API endpoints accessible

## 🗄️ Database Models

### User/Patient Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  image: String (default profile image),
  phone: String (default: '000000000'),
  address: {
    line1: String,
    line2: String
  },
  gender: String (default: 'Not Selected'),
  dob: String (default: 'Not Selected'),
  password: String (required, hashed)
}
```

### Doctor Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  image: String,
  speciality: String (required),
  degree: String (required),
  experience: String (required),
  about: String (required),
  fees: Number (required),
  address: Object (required),
  date: Number (timestamp),
  slots_booked: Object,
  available: Boolean (default: true),
  status: String (pending/approved/rejected),
  documents: {
    licenseDoc: String,
    degreeDoc: String,
    experienceDoc: String
  },
  password: String (required, hashed)
}
```

### Appointment Model
```javascript
{
  userId: ObjectId (ref: User),
  docId: ObjectId (ref: Doctor),
  slotDate: String (required),
  slotTime: String (required),
  userData: Object (patient info),
  docData: Object (doctor info),
  amount: Number (required),
  date: Number (timestamp),
  cancelled: Boolean (default: false),
  payment: Boolean (default: false),
  isCompleted: Boolean (default: false)
}
```

## 🌐 API Endpoints

### 🔐 Authentication Routes

#### Admin Authentication
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@prescripto.com",
  "password": "admin123"
}
```

#### Doctor Authentication
```http
POST /api/doctor/login
Content-Type: application/json

{
  "email": "doctor@example.com",
  "password": "password123"
}
```

#### Patient Authentication
```http
POST /api/user/register
POST /api/user/login
Content-Type: application/json

{
  "name": "Patient Name",
  "email": "patient@example.com",
  "password": "password123"
}
```

### 🏥 Doctor Management Routes

#### Admin Doctor Operations
```http
GET /api/admin/all-doctors           # Get all approved doctors
POST /api/admin/add-doctor           # Add new doctor (with file upload)
GET /api/admin/pending-doctors       # Get pending doctor applications
POST /api/admin/update-doctor-status # Approve/reject doctor
POST /api/admin/change-availability  # Toggle doctor availability
POST /api/admin/change-doctor-password # Reset doctor password
GET /api/admin/doctor-stats          # Get doctor statistics
```

#### Doctor Self-Management
```http
GET /api/doctor/profile              # Get doctor profile
POST /api/doctor/update-profile      # Update doctor information
GET /api/doctor/appointments         # Get doctor's appointments
POST /api/doctor/complete-appointment # Mark appointment complete
POST /api/doctor/cancel-appointment  # Cancel appointment
POST /api/doctor/change-availability # Update availability
```

### 👥 Patient Management Routes *(New)*

#### Admin Patient Operations
```http
GET /api/admin/all-patients          # Get all registered patients
POST /api/admin/change-password      # Change patient password
```

#### Patient Self-Management
```http
GET /api/user/get-profile           # Get user profile
POST /api/user/update-profile       # Update profile information
POST /api/user/book-appointment     # Book new appointment
GET /api/user/appointments          # Get user's appointments
POST /api/user/cancel-appointment   # Cancel appointment
```

### 📅 Appointment Management

#### Admin Appointment Operations
```http
GET /api/admin/appointments         # Get all appointments
POST /api/admin/cancel-appointment  # Cancel appointment
POST /api/admin/complete-appointment # Mark as completed
GET /api/admin/dashboard            # Get dashboard statistics
```

#### Appointment Booking Flow
```http
GET /api/user/list-doctors          # Get available doctors
POST /api/user/book-appointment     # Book appointment slot
POST /api/user/payment-verify       # Verify payment (if integrated)
```

## 🛡️ Security Implementation

### Authentication Middleware
```javascript
// authAdmin.js - Admin route protection
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({success: false, message: "Not Authorized"});
    }
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({success: false, message: "Not Authorized"});
    }
    next();
  } catch (error) {
    res.json({success: false, message: error.message});
  }
}
```

### Password Security
```javascript
// Password hashing with bcrypt
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Password verification
const isMatch = await bcrypt.compare(password, user.password);
```

### File Upload Security
```javascript
// Multer configuration with file validation
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    // File type validation
    if (file.mimetype.startsWith('image/')) {
      callback(null, true);
    } else {
      callback(new Error('Only image files allowed'), false);
    }
  }
});
```

## 📊 Controller Functions

### Admin Controller Features
```javascript
// Patient Management (New)
const allPatients = async (req, res) => {
  // Get all patients excluding passwords
  const patients = await userModel.find({}).select('-password');
  res.json({ success: true, patients });
}

const changeUserPassword = async (req, res) => {
  // Secure password change for users/doctors
  const { userId, newPassword, userType } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  
  if (userType === 'patient') {
    await userModel.findByIdAndUpdate(userId, { password: hashedPassword });
  } else if (userType === 'doctor') {
    await doctorModel.findByIdAndUpdate(userId, { password: hashedPassword });
  }
}

// Doctor Management
const addDoctor = async (req, res) => {
  // Comprehensive doctor registration with file uploads
  // Document validation and Cloudinary upload
  // Database insertion with approval workflow
}

const getPendingDoctors = async (req, res) => {
  // Get doctors awaiting approval
  const doctors = await doctorModel.find({ status: 'pending' });
}

// Dashboard Analytics
const adminDashboard = async (req, res) => {
  // System-wide statistics
  const doctors = await doctorModel.find({ status: 'approved' });
  const users = await userModel.find({});
  const appointments = await appointmentModel.find({});
  
  const dashData = {
    doctors: doctors.length,
    appointments: appointments.length,
    patients: users.length,
    latestAppointments: appointments.reverse()
  };
}
```

### Doctor Controller Features
```javascript
// Profile Management
const doctorProfile = async (req, res) => {
  // Get doctor profile data
  const doctor = await doctorModel.findById(docId).select('-password');
}

// Appointment Management
const appointmentsDoctor = async (req, res) => {
  // Get doctor's appointments
  const appointments = await appointmentModel.find({docId});
}

// Availability Management
const changeAvailablity = async (req, res) => {
  // Toggle doctor availability
  await doctorModel.findByIdAndUpdate(docId, {available});
}
```

### User Controller Features
```javascript
// Authentication
const registerUser = async (req, res) => {
  // User registration with validation
  // Email uniqueness check
  // Password hashing
  // Default profile setup
}

const loginUser = async (req, res) => {
  // User authentication
  // Password verification
  // JWT token generation
}

// Appointment Booking
const bookAppointment = async (req, res) => {
  // Slot availability validation
  // Appointment creation
  // Doctor slot booking
  // Confirmation response
}
```

## 🧪 Testing Utilities

### Test Scripts Available
```javascript
// test-patient-apis.js - Patient management testing
// test-doctor-api.js - Doctor operations testing
// test-login-ankita.js - Authentication testing
// check-doctors.js - Doctor data validation
```

### Testing Workflow
1. **Authentication Testing**
   ```bash
   node test-login-ankita.js
   ```

2. **Patient API Testing**
   ```bash
   node test-patient-apis.js
   ```

3. **Doctor Management Testing**
   ```bash
   node test-doctor-api.js
   ```

## 🔧 Configuration Files

### MongoDB Connection
```javascript
// config/mongodb.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}
```

### Cloudinary Setup
```javascript
// config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });
}
```

## 🚀 Server Configuration

### Main Server Setup
```javascript
// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Database & Cloud Storage
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log("Server Started", port));
```

## 🎯 Recent Enhancements

### Patient Management System *(New)*
- Complete patient list API
- Advanced search capabilities
- Password management for patients
- Enhanced security validation
- Admin-controlled patient operations

### Security Improvements
- Enhanced authentication middleware
- Better password hashing
- Improved input validation
- Secure file upload handling

### API Optimizations
- Better error handling
- Consistent response formats
- Performance improvements
- Enhanced logging

## 📦 Environment Variables

### Required Configuration
```env
# Database
MONGODB_URI=mongodb://localhost:27017/prescripto

# Authentication
JWT_SECRET=your_super_secure_jwt_secret
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=secure_admin_password

# File Storage
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

# Server
PORT=4000
NODE_ENV=development
```

## 🔮 Future Enhancements

### Planned Features
- **Real-time Notifications**: WebSocket integration
- **Payment Integration**: Stripe/PayPal integration
- **Email Services**: SMTP email notifications
- **SMS Integration**: Appointment reminders
- **Advanced Analytics**: Detailed reporting APIs

### Technical Improvements
- **Rate Limiting**: API request throttling
- **Caching**: Redis integration for performance
- **API Documentation**: Swagger/OpenAPI docs
- **Testing Suite**: Comprehensive test coverage
- **Monitoring**: Error tracking and metrics

## 🤝 Contributing

### Development Guidelines
- Follow RESTful API conventions
- Maintain consistent error handling
- Write comprehensive tests
- Document all new endpoints
- Use proper HTTP status codes

### Code Style
- Use ES6+ features
- Consistent naming conventions
- Proper error handling
- Security-first approach

## 📄 License
This project is part of the Prescripto healthcare platform and is proprietary software.

---

**Built with ❤️ for secure healthcare management**