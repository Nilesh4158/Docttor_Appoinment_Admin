# Prescripto Admin Panel

## 🎯 Overview
The Prescripto Admin Panel is a comprehensive administrative dashboard built with React for managing the healthcare platform. It provides administrators with complete control over doctors, patients, appointments, and system operations.

## 🚀 Features

### 🏥 **Doctor Management**
- **Add New Doctors**: Complete doctor registration with profile setup
- **Doctors List**: View all approved doctors with their specialties
- **Doctor Approval System**: Review and approve pending doctor applications
- **Doctor Profile Management**: Edit doctor information and credentials
- **Password Management**: Admin can reset doctor passwords
- **Availability Control**: Manage doctor schedules and availability

### 👥 **Patient Management** *(New Feature)*
- **Patient List**: Comprehensive view of all registered patients
- **Patient Profiles**: Detailed patient information including:
  - Personal details (name, email, phone)
  - Medical information (gender, DOB)
  - Address information
  - Profile pictures
- **Password Reset**: Admin can change patient passwords
- **Advanced Search**: Multi-field search by name, email, or phone
- **Statistics Dashboard**: Patient counts and active profiles

### 📅 **Appointment Management**
- **All Appointments**: View and manage all appointments
- **Appointment Status**: Mark appointments as completed or cancelled
- **Real-time Updates**: Live appointment tracking
- **Appointment Analytics**: Dashboard with appointment statistics

### 📊 **Dashboard & Analytics**
- **System Overview**: Key metrics and statistics
- **Doctor Statistics**: Performance and availability metrics
- **Patient Analytics**: Registration and activity trends
- **Appointment Insights**: Booking patterns and completion rates

## 🛠 Technology Stack

### Frontend Framework
- **React 18.3.1**: Modern React with hooks and functional components
- **Vite**: Lightning-fast build tool and development server
- **React Router DOM 6.25.1**: Client-side routing and navigation

### Styling & UI
- **Tailwind CSS 3.4.7**: Utility-first CSS framework
- **Custom Components**: Reusable UI components
- **Responsive Design**: Mobile-first approach
- **Modern Animations**: Smooth transitions and hover effects

### State Management
- **React Context API**: Global state management
- **AdminContext**: Admin-specific state and functions
- **DoctorContext**: Doctor-related operations
- **AppContext**: Application-wide state

### HTTP Client & Notifications
- **Axios 1.7.2**: Promise-based HTTP client
- **React Toastify 10.0.5**: Toast notifications for user feedback

## 📁 Project Structure

```
admin/
├── public/                 # Static assets
│   ├── favicon.svg
│   └── vite.svg
├── src/
│   ├── assets/            # Images, icons, and static files
│   │   ├── add_icon.svg
│   │   ├── admin_logo.svg
│   │   ├── appointment_icon.svg
│   │   ├── patients_icon.svg
│   │   └── ... (more icons)
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx     # Top navigation bar
│   │   └── Sidebar.jsx    # Sidebar navigation
│   ├── context/          # React Context providers
│   │   ├── AdminContext.jsx    # Admin state management
│   │   ├── AppContext.jsx      # App-wide state
│   │   └── DoctorContext.jsx   # Doctor operations
│   ├── pages/            # Main application pages
│   │   ├── Admin/        # Admin-specific pages
│   │   │   ├── AddDoctor.jsx        # Add new doctor form
│   │   │   ├── AllAppointments.jsx  # Appointments management
│   │   │   ├── ApproveDoctors.jsx   # Doctor approval system
│   │   │   ├── Dashboard.jsx        # Admin dashboard
│   │   │   ├── DoctorsList.jsx      # Doctors list view
│   │   │   └── PatientsList.jsx     # Patients management *(New)*
│   │   ├── Doctor/       # Doctor-specific pages
│   │   │   ├── DoctorAppointments.jsx  # Doctor's appointments
│   │   │   ├── DoctorDashboard.jsx     # Doctor dashboard
│   │   │   └── DoctorProfile.jsx       # Doctor profile management
│   │   └── Login.jsx     # Authentication page
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── .env                  # Environment variables
├── .eslintrc.cjs        # ESLint configuration
├── .gitignore           # Git ignore rules
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vercel.json          # Vercel deployment config
└── vite.config.js       # Vite configuration
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps
1. **Navigate to admin directory**
   ```bash
   cd admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env` file with:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open browser to `http://localhost:5173`
   - Login with admin credentials

## 🎨 UI/UX Features

### Modern Design System
- **Glass-morphism Effects**: Modern backdrop blur styling
- **Gradient Backgrounds**: Professional color schemes
- **Interactive Elements**: Hover animations and transitions
- **Consistent Theming**: Healthcare-appropriate color palette

### Navigation System
- **Sidebar Navigation**: Role-based menu items
- **Breadcrumb Navigation**: Current page indication
- **Responsive Design**: Mobile-friendly collapsible sidebar

### Component Design
- **Modern Cards**: Clean, professional card layouts
- **Data Tables**: Sortable and filterable tables
- **Modal Dialogs**: Overlay interfaces for detailed views
- **Form Components**: Styled input fields and validation

### User Experience
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Comprehensive error messages
- **Success Feedback**: Toast notifications for all actions
- **Accessibility**: ARIA labels and keyboard navigation

## 🔐 Authentication & Security

### Admin Authentication
- **Secure Login**: Email/password authentication
- **Token Management**: JWT token storage and validation
- **Role-based Access**: Admin vs Doctor role separation
- **Session Management**: Automatic logout on token expiry

### Data Protection
- **API Security**: All requests include authentication headers
- **Input Validation**: Client-side and server-side validation
- **Secure Storage**: Sensitive data encryption

## 📱 Component Details

### Core Components

#### **Navbar.jsx**
- Top navigation bar with user info
- Logout functionality
- Responsive design

#### **Sidebar.jsx**
- Role-based navigation menu
- Admin and Doctor sections
- Active state indication
- Modern styling with animations

### Admin Pages

#### **Dashboard.jsx**
- System overview and statistics
- Quick action buttons
- Recent activity feed
- Analytics charts

#### **AddDoctor.jsx**
- Comprehensive doctor registration form
- Image upload functionality
- Document upload support
- Form validation

#### **DoctorsList.jsx**
- Paginated doctors table
- Search and filter functionality
- Quick actions (edit, availability toggle)
- Professional card layouts

#### **PatientsList.jsx** *(New Feature)*
- Complete patient management interface
- Advanced search capabilities
- Patient profile modals
- Password reset functionality
- Statistics dashboard

#### **ApproveDoctors.jsx**
- Pending doctor applications
- Document review interface
- Approval/rejection workflow
- Status updates

#### **AllAppointments.jsx**
- Comprehensive appointment management
- Status filtering and updates
- Appointment details view
- Bulk operations

### Doctor Pages

#### **DoctorDashboard.jsx**
- Doctor-specific metrics
- Upcoming appointments
- Patient statistics
- Earnings overview

#### **DoctorAppointments.jsx**
- Doctor's appointment schedule
- Patient management
- Appointment status updates
- Calendar integration

#### **DoctorProfile.jsx**
- Profile information management
- Availability settings
- Document updates
- Password changes

## 🌐 API Integration

### Admin Endpoints
```javascript
// Authentication
POST /api/admin/login

// Doctor Management
GET /api/admin/all-doctors
POST /api/admin/add-doctor
POST /api/admin/change-availability
GET /api/admin/pending-doctors
POST /api/admin/update-doctor-status

// Patient Management (New)
GET /api/admin/all-patients
POST /api/admin/change-password

// Appointment Management
GET /api/admin/appointments
POST /api/admin/cancel-appointment
POST /api/admin/complete-appointment

// Dashboard Data
GET /api/admin/dashboard
GET /api/admin/doctor-stats
```

### Context Functions
```javascript
// AdminContext
- getAllDoctors()
- changeAvailability()
- getAllAppointments()
- getDashData()
- allPatients()          // New
- changePassword()       // New

// DoctorContext
- getDoctorData()
- getAppointments()
- updateProfile()
```

## 🎯 Recent Enhancements

### Patient Management System *(New)*
- Complete patient list interface
- Advanced search and filtering
- Patient profile management
- Password reset capabilities
- Modern responsive design

### UI Improvements
- Enhanced sidebar navigation
- Modern card-based layouts
- Improved form styling
- Better error handling
- Toast notification system

### Security Enhancements
- Improved authentication flow
- Better token management
- Enhanced input validation
- Secure password operations

## 📦 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Vercel**: Ready with `vercel.json` configuration
- **Netlify**: Compatible with standard build process
- **Traditional Hosting**: Build and serve static files

## 🔮 Future Enhancements

### Planned Features
- **Advanced Analytics**: Detailed reporting dashboards
- **Bulk Operations**: Multiple record management
- **Export Functionality**: PDF/Excel report generation
- **Real-time Notifications**: WebSocket integration
- **Mobile App**: React Native companion app

### Technical Improvements
- **Performance Optimization**: Code splitting and lazy loading
- **Offline Support**: PWA capabilities
- **Testing Suite**: Unit and integration tests
- **Documentation**: Interactive API documentation

## 🤝 Contributing

### Development Guidelines
- Follow React best practices
- Use TypeScript for new components
- Maintain consistent styling with Tailwind
- Write comprehensive tests
- Document all new features

### Code Style
- ESLint configuration for code quality
- Prettier for consistent formatting
- Component-based architecture
- Functional components with hooks

## 📄 License
MIT License

Copyright (c) 2025 Nilesh Bhardwaj

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
...


---

**Built with ❤️ for better healthcare management**
