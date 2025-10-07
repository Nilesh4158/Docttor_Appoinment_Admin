import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for adding Doctor
const addDoctor = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address, licenseDocLink, degreeDocLink, experienceDocLink } = req.body
        const imageFile = req.file

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            documents: {
                licenseDoc: licenseDocLink || '',
                degreeDoc: degreeDocLink || '',
                experienceDoc: experienceDocLink || ''
            },
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, message: 'Doctor Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({ status: 'approved' }).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({ status: 'approved' })
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get all doctors with pending status
const getPendingDoctors = async (req, res) => {
    try {
        const pendingDoctors = await doctorModel.find({ status: 'pending' }).select('-password');
        res.json({ success: true, data: pendingDoctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching pending doctors" });
    }
}

// Update doctor status (Approve or Reject)
const updateDoctorStatus = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        if (!['approved', 'rejected'].includes(status)) {
            return res.json({ success: false, message: "Invalid status value" });
        }
        await doctorModel.findByIdAndUpdate(doctorId, { status: status });
        res.json({ success: true, message: "Doctor status updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating doctor status" });
    }
}




// API to edit doctor details
const editDoctor = async (req, res) => {
    try {
        const { doctorId, name, email, speciality, degree, experience, fees, about } = req.body;
        
        // Update doctor data
        const updatedDoctor = await doctorModel.findByIdAndUpdate(
            doctorId,
            {
                name,
                email,
                speciality,
                degree,
                experience,
                fees: Number(fees),
                about
            },
            { new: true }
        ).select('-password');

        if (!updatedDoctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        res.json({ success: true, message: "Doctor updated successfully", doctor: updatedDoctor });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get doctor statistics (earnings and appointments)
const getDoctorStats = async (req, res) => {
    try {
        console.log('getDoctorStats called');
        const doctors = await doctorModel.find({ status: 'approved' }).select('-password');
        console.log(`Found ${doctors.length} approved doctors`);
        
        const doctorStats = await Promise.all(
            doctors.map(async (doctor) => {
                // Get all appointments for this doctor
                const appointments = await appointmentModel.find({ docId: doctor._id });
                console.log(`Doctor ${doctor.name}: ${appointments.length} appointments`);
                
                // Calculate total earnings and statistics
                let totalEarnings = 0;
                let completedAppointments = 0;
                let totalAppointments = appointments.length;
                let cancelledAppointments = 0;

                appointments.forEach(appointment => {
                    console.log(`Appointment: cancelled=${appointment.cancelled}, isCompleted=${appointment.isCompleted}, payment=${appointment.payment}, amount=${appointment.amount}`);
                    if (appointment.cancelled) {
                        cancelledAppointments++;
                    } else if (appointment.isCompleted && appointment.payment) {
                        // Only count as earnings if both completed and paid
                        totalEarnings += appointment.amount;
                        completedAppointments++;
                    } else if (appointment.isCompleted || appointment.payment) {
                        // Count as completed if either completed or paid
                        totalEarnings += appointment.amount;
                        completedAppointments++;
                    }
                });
                
                console.log(`Doctor ${doctor.name} stats: earnings=${totalEarnings}, completed=${completedAppointments}`);

                return {
                    ...doctor.toObject(),
                    totalEarnings,
                    totalAppointments,
                    completedAppointments,
                    cancelledAppointments,
                    pendingAppointments: totalAppointments - completedAppointments - cancelledAppointments
                };
            })
        );

        console.log('Returning doctor stats');
        res.json({ success: true, doctors: doctorStats });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// API to change doctor password
const changeDoctorPassword = async (req, res) => {
    try {
        const { doctorId, newPassword } = req.body

        if (!doctorId || !newPassword) {
            return res.json({ success: false, message: "Doctor ID and new password are required" })
        }

        if (newPassword.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters long" })
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        // Update doctor password
        const updatedDoctor = await doctorModel.findByIdAndUpdate(
            doctorId,
            { password: hashedPassword },
            { new: true }
        )

        if (!updatedDoctor) {
            return res.json({ success: false, message: "Doctor not found" })
        }

        res.json({ success: true, message: "Password changed successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to mark appointment completed for admin panel
const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

        res.json({ success: true, message: "Appointment marked as completed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get all patients list for admin panel
const allPatients = async (req, res) => {
    try {
        const patients = await userModel.find({}).select('-password')
        res.json({ success: true, patients })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to change user/doctor password
const changeUserPassword = async (req, res) => {
    try {
        const { userId, newPassword, userType } = req.body

        if (!userId || !newPassword || newPassword.length < 6) {
            return res.json({ success: false, message: "Invalid data provided" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        if (userType === 'patient') {
            await userModel.findByIdAndUpdate(userId, { password: hashedPassword })
        } else if (userType === 'doctor') {
            await doctorModel.findByIdAndUpdate(userId, { password: hashedPassword })
        } else {
            return res.json({ success: false, message: "Invalid user type" })
        }

        res.json({ success: true, message: "Password changed successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginAdmin,
    getPendingDoctors,
    updateDoctorStatus,
    appointmentsAdmin,
    appointmentCancel,
    addDoctor,
    allDoctors,
    adminDashboard,
    editDoctor,
    getDoctorStats,
    changeDoctorPassword,
    appointmentComplete,
    allPatients,
    changeUserPassword
}