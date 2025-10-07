// Create a simple test doctor for debugging
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const createSimpleDoctor = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected');
        
        // Use the exact same schema as the model
        const doctorSchema = new mongoose.Schema({
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            image: { type: String, required: true },
            speciality: { type: String, required: true },
            degree: { type: String, required: true },
            experience: { type: String, required: true },
            about: { type: String, required: true },
            available: { type: Boolean, default: true },
            fees: { type: Number, required: true },
            address: { type: Object, required: true },
            date: { type: Number, required: true },
            slots_booked: { type: Object, default: {} },
            status: { type: String, default: 'pending' }
        });
        
        const Doctor = mongoose.model('doctor', doctorSchema);
        
        // Delete existing test doctor
        await Doctor.deleteOne({ email: 'doctor@test.com' });
        console.log('Deleted existing test doctor');
        
        // Create password hash
        const hashedPassword = await bcrypt.hash('password123', 10);
        console.log('Generated password hash');
        
        // Create new doctor with minimal required data
        const newDoctor = new Doctor({
            name: 'Dr. Test Doctor',
            email: 'doctor@test.com',
            password: hashedPassword,
            image: 'https://via.placeholder.com/150/doctor.jpg',
            speciality: 'General physician',
            degree: 'MBBS',
            experience: '5 Years',
            about: 'Test doctor for debugging authentication',
            available: true,
            fees: 50,
            address: {
                line1: '123 Test Street',
                line2: 'Test City'
            },
            date: Date.now(),
            slots_booked: {},
            status: 'approved'
        });
        
        const savedDoctor = await newDoctor.save();
        console.log('✅ New test doctor created successfully');
        console.log('Doctor ID:', savedDoctor._id);
        console.log('Doctor Status:', savedDoctor.status);
        
        // Verify password immediately
        const testMatch = await bcrypt.compare('password123', savedDoctor.password);
        console.log('Password verification test:', testMatch);
        
        console.log('\n🎉 Login credentials:');
        console.log('Email: doctor@test.com');
        console.log('Password: password123');
        
        process.exit(0);
    } catch (error) {
        console.log('Error:', error);
        process.exit(1);
    }
};

createSimpleDoctor();