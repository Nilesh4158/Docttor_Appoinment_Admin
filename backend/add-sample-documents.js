import mongoose from 'mongoose';
import doctorModel from './models/doctorModel.js';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nilesh:nilesh123@cluster0.st4055e.mongodb.net/prescripto');
        console.log('Connected to MongoDB');
        
        // Update Dr.VeerSingh to have sample documents
        const result = await doctorModel.findOneAndUpdate(
            { email: 'veer@gmail.com' },
            { 
                documents: {
                    licenseDoc: 'https://drive.google.com/file/d/1j1_35RsPB2caeZjjjUpYkqh6D7bZbx5C/view',
                    degreeDoc: 'https://drive.google.com/file/d/1j1_35RsPB2caeZjjjUpYkqh6D7bZbx5C/view',
                    experienceDoc: 'https://drive.google.com/file/d/1j1_35RsPB2caeZjjjUpYkqh6D7bZbx5C/view'
                }
            },
            { new: true }
        );
        
        if (result) {
            console.log('Updated Dr.VeerSingh with sample documents');
            console.log('Documents:', result.documents);
        } else {
            console.log('Doctor not found');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

connectDB();