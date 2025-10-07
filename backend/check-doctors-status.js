import mongoose from 'mongoose';
import doctorModel from './models/doctorModel.js';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nilesh:nilesh123@cluster0.st4055e.mongodb.net/prescripto');
        console.log('Connected to MongoDB');
        
        const doctors = await doctorModel.find({}).select('name email status documents');
        console.log(`Total doctors found: ${doctors.length}\n`);
        
        doctors.forEach((doc, index) => {
            console.log(`${index + 1}. Name: ${doc.name}`);
            console.log(`   Email: ${doc.email}`);
            console.log(`   Status: ${doc.status || 'No status set'}`);
            console.log(`   Documents:`);
            if (doc.documents) {
                console.log(`     - License: ${doc.documents.licenseDoc || 'Not uploaded'}`);
                console.log(`     - Degree: ${doc.documents.degreeDoc || 'Not uploaded'}`);
                console.log(`     - Experience: ${doc.documents.experienceDoc || 'Not uploaded'}`);
            } else {
                console.log(`     - No documents field`);
            }
            console.log('---\n');
        });
        
        const pendingDoctors = doctors.filter(doc => doc.status === 'pending');
        console.log(`Doctors with pending status: ${pendingDoctors.length}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

connectDB();