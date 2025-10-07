// Test script for patient management APIs
const axios = require('axios');

const backendUrl = 'http://localhost:4000';

// Test admin login first (you'll need to use your actual admin credentials)
const testAdminLogin = async () => {
    try {
        const response = await axios.post(`${backendUrl}/api/admin/login`, {
            email: process.env.ADMIN_EMAIL || 'admin@prescripto.com',
            password: process.env.ADMIN_PASSWORD || 'admin123'
        });
        
        if (response.data.success) {
            console.log('✅ Admin login successful');
            return response.data.token;
        } else {
            console.log('❌ Admin login failed:', response.data.message);
            return null;
        }
    } catch (error) {
        console.log('❌ Admin login error:', error.message);
        return null;
    }
};

// Test get all patients API
const testGetAllPatients = async (token) => {
    try {
        const response = await axios.get(`${backendUrl}/api/admin/all-patients`, {
            headers: { aToken: token }
        });
        
        if (response.data.success) {
            console.log('✅ Get all patients successful');
            console.log(`📊 Found ${response.data.patients.length} patients`);
            if (response.data.patients.length > 0) {
                console.log('👤 Sample patient:', {
                    name: response.data.patients[0].name,
                    email: response.data.patients[0].email,
                    id: response.data.patients[0]._id
                });
                return response.data.patients[0]._id; // Return first patient ID for password test
            }
        } else {
            console.log('❌ Get all patients failed:', response.data.message);
        }
        return null;
    } catch (error) {
        console.log('❌ Get all patients error:', error.message);
        return null;
    }
};

// Test change password API
const testChangePassword = async (token, patientId) => {
    if (!patientId) {
        console.log('⚠️ No patient ID available for password change test');
        return;
    }
    
    try {
        const response = await axios.post(`${backendUrl}/api/admin/change-password`, {
            userId: patientId,
            newPassword: 'testpassword123',
            userType: 'patient'
        }, {
            headers: { aToken: token }
        });
        
        if (response.data.success) {
            console.log('✅ Change password successful');
        } else {
            console.log('❌ Change password failed:', response.data.message);
        }
    } catch (error) {
        console.log('❌ Change password error:', error.message);
    }
};

// Run all tests
const runTests = async () => {
    console.log('🚀 Starting Patient Management API Tests...\n');
    
    const token = await testAdminLogin();
    if (!token) {
        console.log('❌ Cannot proceed without admin token');
        return;
    }
    
    console.log('\n🔍 Testing get all patients...');
    const patientId = await testGetAllPatients(token);
    
    console.log('\n🔑 Testing change password...');
    await testChangePassword(token, patientId);
    
    console.log('\n✨ Tests completed!');
};

runTests();