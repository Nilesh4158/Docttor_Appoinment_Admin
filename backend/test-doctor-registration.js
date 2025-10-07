import mongoose from 'mongoose';
import doctorModel from './models/doctorModel.js';
import bcrypt from 'bcrypt';

const testDoctorRegistration = async () => {
    try {
        await mongoose.connect('mongodb+srv://nilesh:nilesh123@cluster0.st4055e.mongodb.net/prescripto');
        console.log('Connected to MongoDB');

        // Create a test doctor registration similar to what frontend would send
        const hashedPassword = await bcrypt.hash('testpass123', 10);
        
        const testDoctor = new doctorModel({
            name: 'Dr. Test Frontend',
            email: 'testfrontend@example.com',
            password: hashedPassword,
            image: 'https://via.placeholder.com/150',
            speciality: 'General physician',
            experience: '2 Years',
            fees: 500,
            about: 'This is a test doctor registered from frontend with separate document links.',
            degree: 'MBBS',
            address: { line1: 'Test Address 1', line2: 'Test Address 2' },
            documents: {
                licenseDoc: 'https://drive.google.com/file/d/1test_license_doc/view',
                degreeDoc: 'https://drive.google.com/file/d/1test_degree_doc/view',
                experienceDoc: 'https://drive.google.com/file/d/1test_experience_doc/view'
            },
            status: 'pending',
            date: Date.now()
        });

        await testDoctor.save();
        console.log('✅ Test doctor created successfully!');
        
        // Verify it appears in pending doctors
        const pendingDoctors = await doctorModel.find({ status: 'pending' }).select('name email documents');
        console.log('\nPending doctors with documents:');
        pendingDoctors.forEach((doc, index) => {
            console.log(`${index + 1}. ${doc.name} (${doc.email})`);
            if (doc.documents && (doc.documents.licenseDoc || doc.documents.degreeDoc || doc.documents.experienceDoc)) {
                console.log(`   License: ${doc.documents.licenseDoc || 'None'}`);
                console.log(`   Degree: ${doc.documents.degreeDoc || 'None'}`);
                console.log(`   Experience: ${doc.documents.experienceDoc || 'None'}`);
            }
            console.log('---');
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

testDoctorRegistration();