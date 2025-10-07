import axios from 'axios';

const testPendingDoctorsDirectly = async () => {
    try {
        console.log('Testing pending doctors API...');
        
        // Test admin login
        const loginResponse = await axios.post('http://localhost:4000/api/admin/login', {
            email: 'admin@gmail.com',
            password: 'admin'
        });
        
        if (loginResponse.data.success) {
            console.log('✅ Admin login successful');
            
            // Test pending doctors
            const pendingResponse = await axios.get('http://localhost:4000/api/admin/pending-doctors', {
                headers: { aToken: loginResponse.data.token }
            });
            
            if (pendingResponse.data.success) {
                console.log(`✅ Found ${pendingResponse.data.data.length} pending doctors`);
                
                // Show doctors with documents
                const doctorsWithDocs = pendingResponse.data.data.filter(doc => 
                    doc.documents && (doc.documents.licenseDoc || doc.documents.degreeDoc || doc.documents.experienceDoc)
                );
                
                console.log(`\n📋 Doctors with document links: ${doctorsWithDocs.length}`);
                doctorsWithDocs.forEach((doc, index) => {
                    console.log(`${index + 1}. ${doc.name} (${doc.email})`);
                    console.log(`   License: ${doc.documents.licenseDoc ? '✅' : '❌'}`);
                    console.log(`   Degree: ${doc.documents.degreeDoc ? '✅' : '❌'}`);
                    console.log(`   Experience: ${doc.documents.experienceDoc ? '✅' : '❌'}`);
                });
                
                console.log('\n🎉 Admin panel should now show these doctors with their document links!');
            } else {
                console.log('❌ Failed to get pending doctors');
            }
        } else {
            console.log('❌ Admin login failed');
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Backend server is not running. Please start it with: npm run server');
        }
    }
};

testPendingDoctorsDirectly();