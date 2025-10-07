// Test doctor login API directly
import axios from 'axios';

const backendUrl = 'http://localhost:4000';

const testDoctorAuth = async () => {
    try {
        console.log('🔐 Testing doctor login...');
        
        // Login
        const loginResponse = await axios.post(backendUrl + '/api/doctor/login', {
            email: 'doctor@test.com',
            password: 'password123'
        });
        
        console.log('Login response:', loginResponse.data);
        
        if (loginResponse.data.success) {
            const token = loginResponse.data.token;
            console.log('✅ Login successful, token received');
            
            // Test appointments API
            console.log('\n📅 Testing appointments API...');
            const appointmentsResponse = await axios.get(backendUrl + '/api/doctor/appointments', {
                headers: { 
                    dToken: token,
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Appointments response:', appointmentsResponse.data);
            
            // Test profile API
            console.log('\n👨‍⚕️ Testing profile API...');
            const profileResponse = await axios.get(backendUrl + '/api/doctor/profile', {
                headers: { 
                    dToken: token,
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Profile response:', profileResponse.data);
            
            // Test dashboard API
            console.log('\n📊 Testing dashboard API...');
            const dashboardResponse = await axios.get(backendUrl + '/api/doctor/dashboard', {
                headers: { 
                    dToken: token,
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Dashboard response:', dashboardResponse.data);
            
        } else {
            console.log('❌ Login failed:', loginResponse.data.message);
        }
        
    } catch (error) {
        if (error.response) {
            console.log('❌ HTTP Error:', error.response.status, error.response.statusText);
            console.log('Response data:', error.response.data);
            console.log('Response headers:', error.response.headers);
        } else if (error.request) {
            console.log('❌ No response received. Request details:');
            console.log(error.request._header || error.request);
        } else {
            console.log('❌ Error:', error.message);
        }
    }
};

testDoctorAuth();