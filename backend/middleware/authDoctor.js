import jwt from 'jsonwebtoken'

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        // Node lower-cases header names; axios sends 'dToken' but Express receives 'dtoken'
        let token = req.headers['dtoken'];

        // Fallback to Authorization: Bearer <token>
        if (!token && req.headers['authorization']) {
            const authHeader = req.headers['authorization'];
            if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (process.env.DOCTOR_AUTH_DEBUG === 'true') {
            console.log('🔍 Doctor Auth Debug:');
            console.log('- Headers received:', Object.keys(req.headers).join(', '));
            console.log('- token header (dtoken) exists:', !!req.headers['dtoken']);
            console.log('- authorization header exists:', !!req.headers['authorization']);
            console.log('- token length:', token ? token.length : 0);
        }

        if (!token) {
            if (process.env.DOCTOR_AUTH_DEBUG === 'true') {
                console.log('❌ No token provided');
            }
            return res.json({ success: false, message: "Not Authorized, Login Again" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (process.env.DOCTOR_AUTH_DEBUG === 'true') {
            console.log('✅ Token verified for doctor ID:', token_decode.id);
        }
        req.docId = token_decode.id;
        next();
    } catch (error) {
        if (process.env.DOCTOR_AUTH_DEBUG === 'true') {
            console.log('❌ Doctor auth error:', error.message);
        }
        res.json({ success: false, message: "Not Authorized, Login Again" });
    }
};

export default authDoctor;