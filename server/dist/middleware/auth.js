import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Expected format: "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        return;
    }
    catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};
