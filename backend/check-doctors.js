// Check doctors in database
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected');
        
        // Check doctors
        const Doctor = mongoose.model('doctor', new mongoose.Schema({
            name: String,
            email: String,
            password: String,
            speciality: String,
            available: Boolean,
            status: String
        }));
        
        const doctors = await Doctor.find({});
        console.log('Doctors in database:', doctors.length);
        doctors.forEach((doc, index) => {
            console.log(`${index + 1}. Name: ${doc.name}, Email: ${doc.email}, Speciality: ${doc.speciality}, Status: ${doc.status}, Available: ${doc.available}`);
        });
        
        if (doctors.length === 0) {
            console.log('No doctors found in database!');
        }
        
        process.exit(0);
    } catch (error) {
        console.log('Database connection error:', error);
        process.exit(1);
    }
};

connectDB();