// Test script to verify doctor authentication
import axios from 'axios';

const backendUrl = 'http://localhost:4000';

// Test doctor login
const testDoctorLogin = async () => {
    try {
        console.log('Testing doctor login...');
        
        // You can replace these with actual doctor credentials from your database
        const loginData = {
            email: 'ankita@gmail.com', // Replace with actual doctor email
            password: 'ankita123'   // Replace with actual doctor password
        };
        
        const { data } = await axios.post(backendUrl + '/api/doctor/login', loginData);
        
        if (data.success) {
            console.log('✅ Doctor login successful');
            console.log('Token received:', data.token);
            
            // Test authenticated request
            const appointmentsResponse = await axios.get(backendUrl + '/api/doctor/appointments', {
                headers: { 
                    dToken: data.token,
                    'Content-Type': 'application/json'
                }
            });
            
            if (appointmentsResponse.data.success) {
                console.log('✅ Authenticated request successful');
                console.log('Appointments:', appointmentsResponse.data.appointments?.length || 0);
            } else {
                console.log('❌ Authenticated request failed:', appointmentsResponse.data.message);
            }
            
        } else {
            console.log('❌ Doctor login failed:', data.message);
        }
        
    } catch (error) {
        console.log('❌ Error:', error.response?.data?.message || error.message);
    }
};

testDoctorLogin();