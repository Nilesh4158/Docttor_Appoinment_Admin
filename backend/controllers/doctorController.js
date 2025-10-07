import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"; // Add this import
import { v2 as cloudinary } from "cloudinary"; // Add this import
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API for doctor Login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        if (doctor.status !== "approved") {
            if (doctor.status === "pending") {
                return res.json({
                    success: false,
                    message: "Your account is pending approval from the admin.",
                });
            } else {
                return res.json({
                    success: false,
                    message: "Your registration has been rejected. Please contact support.",
                });
            }
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log('Login error:', error.message);
        res.json({ success: false, message: error.message });
    }
};

// Register Doctor - UPDATED FUNCTION
const registerDoctor = async (req, res) => {
    try {
        const { name, email, password, experience, fees, about, speciality, degree, address, licenseDocLink, degreeDocLink, experienceDocLink } = req.body;
        const imageFile = req.file;

        // 2. CHECK FOR MISSING DETAILS (from addDoctor)
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "Missing required details. Please fill out the entire form." });
        }

        // 3. VALIDATE EMAIL FORMAT (from addDoctor)
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email address." });
        }

        // 4. VALIDATE PASSWORD STRENGTH (from addDoctor)
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long." });
        }

        // Check if doctor already exists
        const exists = await doctorModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Doctor with this email already exists" });
        }

        // Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newDoctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            experience,
            fees: Number(fees),
            about,
            degree,
            address: JSON.parse(address),
            documents: {
                licenseDoc: licenseDocLink || '',
                degreeDoc: degreeDocLink || '',
                experienceDoc: experienceDocLink || ''
            },
            date: Date.now()
        });

        await newDoctor.save();
        res.json({ success: true, message: "Registration successful. Your application is under review." });

    } catch (error) {
        console.error("Error in registerDoctor controller:", error); 
        res.status(500).json({ success: false, message: "Server error during registration." });
    }
}

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    }

    res.json({ success: false, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    }

    res.json({ success: false, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list for Frontend
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: 'approved' }).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to change doctor availablity for Admin and Doctor Panel
const changeAvailablity = async (req, res) => {
  try {
    const docId = req.docId;
    await doctorModel.findByIdAndUpdate(docId, { available: req.body.available });

    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile for  Doctor Panel
const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update doctor profile data from  Doctor Panel
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const { fees, address, available } = req.body;

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse(),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to change doctor password
const changeDoctorPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const docId = req.docId;

        if (!currentPassword || !newPassword) {
            return res.json({ success: false, message: "All fields are required" });
        }

        if (newPassword.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Get doctor data
        const doctor = await doctorModel.findById(docId);
        
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found. Please login again." });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, doctor.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Current password is incorrect" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        await doctorModel.findByIdAndUpdate(docId, { password: hashedPassword });

        res.json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.log('Password change error:', error.message);
        res.json({ success: false, message: error.message });
    }
};

export {
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
  changeDoctorPassword,
};

