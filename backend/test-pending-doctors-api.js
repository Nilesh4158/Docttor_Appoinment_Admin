import axios from 'axios';

const testPendingDoctorsAPI = async () => {
    try {
        // Test login first
        const loginResponse = await axios.post('http://localhost:4000/api/admin/login', {
            email: 'admin@gmail.com',
            password: 'admin'
        });
        
        if (!loginResponse.data.success) {
            console.log('Login failed:', loginResponse.data.message);
            return;
        }
        
        const token = loginResponse.data.token;
        console.log('✅ Admin login successful');
        
        // Test pending doctors API
        const pendingResponse = await axios.get('http://localhost:4000/api/admin/pending-doctors', {
            headers: { aToken: token }
        });
        
        if (pendingResponse.data.success) {
            console.log('✅ Pending doctors API successful');
            console.log(`Found ${pendingResponse.data.data.length} pending doctors:\n`);
            
            pendingResponse.data.data.forEach((doctor, index) => {
                console.log(`${index + 1}. ${doctor.name} (${doctor.email})`);
                console.log(`   Status: ${doctor.status}`);
                console.log(`   Documents object:`, doctor.documents);
                if (doctor.documents) {
                    console.log(`   License: ${doctor.documents.licenseDoc || 'None'}`);
                    console.log(`   Degree: ${doctor.documents.degreeDoc || 'None'}`);
                    console.log(`   Experience: ${doctor.documents.experienceDoc || 'None'}`);
                }
                console.log('---\n');
            });
        } else {
            console.log('❌ Pending doctors API failed:', pendingResponse.data.message);
        }
        
    } catch (error) {
        console.error('❌ Error testing API:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Make sure the backend server is running on http://localhost:4000');
        }
    }
};

testPendingDoctorsAPI();