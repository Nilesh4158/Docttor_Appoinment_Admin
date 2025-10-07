import mongoose from 'mongoose';
import doctorModel from './models/doctorModel.js';

const checkVeerSingh = async () => {
    try {
        await mongoose.connect('mongodb+srv://nilesh:nilesh123@cluster0.st4055e.mongodb.net/prescripto');
        console.log('Connected to MongoDB');
        
        // Find Dr.VeerSingh specifically
        const veerSingh = await doctorModel.findOne({ email: 'veer@gmail.com' });
        
        if (veerSingh) {
            console.log('Found Dr.VeerSingh:');
            console.log(`Name: ${veerSingh.name}`);
            console.log(`Email: ${veerSingh.email}`);
            console.log(`Status: ${veerSingh.status}`);
            console.log(`Documents:`, JSON.stringify(veerSingh.documents, null, 2));
        } else {
            console.log('Dr.VeerSingh not found!');
        }
        
        // Also get all pending doctors
        console.log('\n--- All Pending Doctors ---');
        const pendingDoctors = await doctorModel.find({ status: 'pending' }).select('name email status documents');
        console.log(`Found ${pendingDoctors.length} pending doctors:`);
        
        pendingDoctors.forEach((doc, index) => {
            console.log(`${index + 1}. ${doc.name} (${doc.email}) - Status: ${doc.status}`);
            if (doc.documents && (doc.documents.licenseDoc || doc.documents.degreeDoc || doc.documents.experienceDoc)) {
                console.log(`   Has documents: License=${!!doc.documents.licenseDoc}, Degree=${!!doc.documents.degreeDoc}, Experience=${!!doc.documents.experienceDoc}`);
            }
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkVeerSingh();