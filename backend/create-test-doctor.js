// Create and approve a test doctor
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const createTestDoctor = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected');
        
        // Define doctor schema
        const doctorSchema = new mongoose.Schema({
            name: String,
            email: String,
            password: String,
            image: String,
            speciality: String,
            degree: String,
            experience: String,
            about: String,
            available: Boolean,
            fees: Number,
            address: Object,
            date: Number,
            slots_booked: Object,
            status: { type: String, default: 'pending' }
        });
        
        const Doctor = mongoose.model('doctor', doctorSchema);
        
        // Check if test doctor already exists
        const existingDoctor = await Doctor.findOne({ email: 'doctor@test.com' });
        
        if (existingDoctor) {
            // Update existing doctor to approved status and reset password
            const hashedPassword = await bcrypt.hash('password123', 10);
            existingDoctor.status = 'approved';
            existingDoctor.available = true;
            existingDoctor.password = hashedPassword;
            await existingDoctor.save();
            console.log('✅ Test doctor updated with new password and approved status');
        } else {
            // Create new test doctor
            const hashedPassword = await bcrypt.hash('password123', 10);
            
            const testDoctor = new Doctor({
                name: 'Dr. Test Doctor',
                email: 'doctor@test.com',
                password: hashedPassword,
                image: 'https://via.placeholder.com/150',
                speciality: 'General physician',
                degree: 'MBBS',
                experience: '5 Years',
                about: 'Test doctor for authentication testing',
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
            
            await testDoctor.save();
            console.log('✅ Test doctor created and approved');
        }
        
        // Verify the doctor
        const doctor = await Doctor.findOne({ email: 'doctor@test.com' });
        console.log('Doctor details:');
        console.log('- Name:', doctor.name);
        console.log('- Email:', doctor.email);
        console.log('- Status:', doctor.status);
        console.log('- Available:', doctor.available);
        console.log('- Speciality:', doctor.speciality);
        
        console.log('\n🎉 You can now login with:');
        console.log('Email: doctor@test.com');
        console.log('Password: password123');
        
        process.exit(0);
    } catch (error) {
        console.log('Error:', error);
        process.exit(1);
    }
};

createTestDoctor();