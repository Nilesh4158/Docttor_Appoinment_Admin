// Test bcrypt password hashing and verification
import bcrypt from 'bcrypt';

const testPasswordHashing = async () => {
    const password = 'password123';
    
    console.log('Testing bcrypt password hashing...');
    console.log('Original password:', password);
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('Hashed password:', hashedPassword);
    
    // Test verification
    const isMatch1 = await bcrypt.compare(password, hashedPassword);
    const isMatch2 = await bcrypt.compare('wrongpassword', hashedPassword);
    
    console.log('Correct password match:', isMatch1);
    console.log('Wrong password match:', isMatch2);
    
    // Test with bcrypt.hash() directly (as used in create-test-doctor.js)
    const hashedPassword2 = await bcrypt.hash(password, 10);
    console.log('Direct hash (salt 10):', hashedPassword2);
    
    const isMatch3 = await bcrypt.compare(password, hashedPassword2);
    console.log('Direct hash match:', isMatch3);
};

testPasswordHashing();