import express from 'express';
import { 
    loginDoctor, 
    registerDoctor, 
    appointmentsDoctor, 
    appointmentCancel, 
    doctorList, 
    changeAvailablity, 
    appointmentComplete, 
    doctorDashboard, 
    doctorProfile, 
    updateDoctorProfile,
    changeDoctorPassword 
} from '../controllers/doctorController.js';

// 1. Import the upload middleware
import upload from '../middleware/multer.js';
import authDoctor from '../middleware/authDoctor.js';

const doctorRouter = express.Router();

// 2. Apply the 'upload' middleware ONLY to the '/register' route
doctorRouter.post("/register", upload.single('image'), registerDoctor);

// --- Other Doctor Routes ---
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/list", doctorList); // Changed to GET as it's a list retrieval
doctorRouter.post("/change-availablity", authDoctor, changeAvailablity);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);
doctorRouter.post("/change-password", authDoctor, changeDoctorPassword);

export default doctorRouter;
