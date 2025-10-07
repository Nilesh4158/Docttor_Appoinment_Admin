const express = require('express');
const cors = require('cors');
const app = express();


// Middlewares
app.use(express.json());
app.use(cors());


// Test admin routes
app.get('/api/admin/pending-doctors', (req, res) => {
    console.log('Received request for pending doctors');
    res.json({ 
        success: true, 
        data: [
            {
                _id: '1',
                name: 'Dr. Test',
                email: 'test@example.com',
                speciality: 'General Physician',
                documentsLink: 'http://example.com/docs'
            }
        ]
    });
});






app.post('/api/admin/update-doctor-status', (req, res) => {
    console.log('Update doctor status:', req.body);
    res.json({ success: true, message: 'Status updated' });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
});