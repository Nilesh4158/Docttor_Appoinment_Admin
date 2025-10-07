import mongoose from 'mongoose';
import doctorModel from './models/doctorModel.js';

const addDocumentsToNishant = async () => {
    try {
        await mongoose.connect('mongodb+srv://nilesh:nilesh123@cluster0.st4055e.mongodb.net/prescripto');
        console.log('Connected to MongoDB');
        
        // Add sample documents to DR.Nishant Sharma
        const result = await doctorModel.updateOne(
            { email: 'nishant@gmail.com' },
            {
                $set: {
                    'documents.licenseDoc': 'https://drive.google.com/file/d/1example_license_doc/view',
                    'documents.degreeDoc': 'https://drive.google.com/file/d/1example_degree_doc/view',
                    'documents.experienceDoc': 'https://drive.google.com/file/d/1example_experience_doc/view'
                }
            }
        );
        
        console.log('Update result:', result);
        
        // Verify the update
        const updatedDoctor = await doctorModel.findOne({ email: 'nishant@gmail.com' });
        console.log('Updated DR.Nishant Sharma documents:');
        console.log(`License: ${updatedDoctor.documents.licenseDoc}`);
        console.log(`Degree: ${updatedDoctor.documents.degreeDoc}`);
        console.log(`Experience: ${updatedDoctor.documents.experienceDoc}`);
        
        console.log('\n✅ Now you have 2 pending doctors with document links to test!');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

addDocumentsToNishant();