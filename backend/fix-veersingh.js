import mongoose from 'mongoose';
import doctorModel from './models/doctorModel.js';

const fixVeerSingh = async () => {
    try {
        await mongoose.connect('mongodb+srv://nilesh:nilesh123@cluster0.st4055e.mongodb.net/prescripto');
        console.log('Connected to MongoDB');
        
        // First, let's see all doctors and their ObjectIds
        const allDoctors = await doctorModel.find({}).select('name email status _id');
        console.log('All doctors in database:');
        allDoctors.forEach((doc, index) => {
            console.log(`${index + 1}. ${doc.name} (${doc.email}) - Status: ${doc.status} - ID: ${doc._id}`);
        });
        
        // Find and update Dr.VeerSingh
        console.log('\n--- Updating Dr.VeerSingh ---');
        const result = await doctorModel.updateOne(
            { email: 'veer@gmail.com' }, 
            { $set: { status: 'pending' } }
        );
        
        console.log('Update result:', result);
        
        // Verify the update
        const veerSingh = await doctorModel.findOne({ email: 'veer@gmail.com' });
        console.log('\nVerification:');
        console.log(`Dr.VeerSingh status: ${veerSingh.status}`);
        console.log(`Documents present: ${!!veerSingh.documents}`);
        
        // Try the pending query again
        console.log('\n--- Testing pending query again ---');
        const pendingDoctors = await doctorModel.find({ status: 'pending' });
        console.log(`Found ${pendingDoctors.length} pending doctors:`);
        pendingDoctors.forEach(doc => {
            console.log(`- ${doc.name} (${doc.email})`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

fixVeerSingh();