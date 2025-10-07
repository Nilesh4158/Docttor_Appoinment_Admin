import mongoose from 'mongoose';
import doctorModel from './models/doctorModel.js';

const debugPendingQuery = async () => {
    try {
        await mongoose.connect('mongodb+srv://nilesh:nilesh123@cluster0.st4055e.mongodb.net/prescripto');
        console.log('Connected to MongoDB');
        
        // Run the exact same query as the backend
        console.log('--- Running exact backend query ---');
        const pendingDoctors = await doctorModel.find({ status: 'pending' }).select('-password');
        
        console.log(`Query returned ${pendingDoctors.length} doctors:`);
        pendingDoctors.forEach((doc, index) => {
            console.log(`${index + 1}. ${doc.name} (${doc.email})`);
            console.log(`   ID: ${doc._id}`);
            console.log(`   Status: ${doc.status}`);
            console.log(`   Documents:`, doc.documents ? 'Present' : 'Missing');
            if (doc.documents) {
                console.log(`     License: ${doc.documents.licenseDoc ? 'Has link' : 'Empty'}`);
                console.log(`     Degree: ${doc.documents.degreeDoc ? 'Has link' : 'Empty'}`);
                console.log(`     Experience: ${doc.documents.experienceDoc ? 'Has link' : 'Empty'}`);
            }
            console.log('---');
        });
        
        // Check Dr.VeerSingh specifically
        console.log('\n--- Checking Dr.VeerSingh specifically ---');
        const veerSingh = await doctorModel.findOne({ email: 'veer@gmail.com' }).select('-password');
        if (veerSingh) {
            console.log('Dr.VeerSingh found with query:');
            console.log(`Status: "${veerSingh.status}" (type: ${typeof veerSingh.status})`);
            console.log(`Status === 'pending': ${veerSingh.status === 'pending'}`);
            console.log(`Raw status value: [${veerSingh.status}]`);
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

debugPendingQuery();