import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const testFrontendRegistration = async () => {
    try {
        console.log('Testing frontend doctor registration...');
        
        // Create a small test image file for upload
        const testImageContent = 'test image content';
        fs.writeFileSync('./test-profile.txt', testImageContent);
        
        const formData = new FormData();
        formData.append('image', fs.createReadStream('./test-profile.txt'));
        formData.append('name', 'Dr. Frontend Test');
        formData.append('email', 'frontendtest@example.com');
        formData.append('password', 'password123');
        formData.append('speciality', 'Cardiologist');
        formData.append('degree', 'MBBS, MD');
        formData.append('experience', '3 Years');
        formData.append('about', 'Test doctor from frontend registration with separate document links');
        formData.append('fees', '750');
        formData.append('address', JSON.stringify({ line1: 'Frontend Test Address 1', line2: 'Frontend Test Address 2' }));
        formData.append('licenseDocLink', 'https://drive.google.com/file/d/1frontend_license_test/view');
        formData.append('degreeDocLink', 'https://drive.google.com/file/d/1frontend_degree_test/view');
        formData.append('experienceDocLink', 'https://drive.google.com/file/d/1frontend_experience_test/view');

        const response = await axios.post('http://localhost:4000/api/doctor/register', formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        console.log('Registration response:', response.data);
        
        if (response.data.success) {
            console.log('✅ Frontend registration successful!');
            
            // Test if it shows up in pending doctors
            const loginResponse = await axios.post('http://localhost:4000/api/admin/login', {
                email: 'admin@gmail.com',
                password: 'admin'
            });
            
            if (loginResponse.data.success) {
                const pendingResponse = await axios.get('http://localhost:4000/api/admin/pending-doctors', {
                    headers: { aToken: loginResponse.data.token }
                });
                
                const newDoctor = pendingResponse.data.data.find(doc => doc.email === 'frontendtest@example.com');
                if (newDoctor) {
                    console.log('✅ New doctor found in pending list!');
                    console.log('Documents:', newDoctor.documents);
                } else {
                    console.log('❌ New doctor not found in pending list');
                }
            }
        } else {
            console.log('❌ Registration failed:', response.data.message);
        }
        
        // Clean up test file
        if (fs.existsSync('./test-profile.txt')) {
            fs.unlinkSync('./test-profile.txt');
        }
        
    } catch (error) {
        console.error('❌ Error testing frontend registration:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Make sure the backend server is running on http://localhost:4000');
        }
        
        // Clean up test file
        if (fs.existsSync('./test-profile.txt')) {
            fs.unlinkSync('./test-profile.txt');
        }
    }
};

testFrontendRegistration();