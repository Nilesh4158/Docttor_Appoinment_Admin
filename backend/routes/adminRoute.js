import express from 'express';
import { getPendingDoctors, updateDoctorStatus, loginAdmin, appointmentsAdmin, appointmentCancel, addDoctor, allDoctors, adminDashboard, editDoctor, getDoctorStats, changeDoctorPassword, appointmentComplete, allPatients, changeUserPassword } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/all-doctors", authAdmin, allDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)
adminRouter.get("/pending-doctors", authAdmin, getPendingDoctors);
adminRouter.post("/update-doctor-status", authAdmin, updateDoctorStatus);
adminRouter.post("/edit-doctor", authAdmin, editDoctor);
adminRouter.get("/doctor-stats", authAdmin, getDoctorStats);
adminRouter.post("/change-doctor-password", authAdmin, changeDoctorPassword);
adminRouter.post("/complete-appointment", authAdmin, appointmentComplete);
adminRouter.get("/all-patients", authAdmin, allPatients);
adminRouter.post("/change-password", authAdmin, changeUserPassword);

export default adminRouter;