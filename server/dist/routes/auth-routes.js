import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'set' : 'NOT SET');
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log('Login attempt for user:', username);
        const user = await User.findOne({ where: { username } });
        console.log('User found:', user ? user.username : 'No user');
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '30m' });
        return res.json({ token });
    }
    catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const router = Router();
router.post('/login', login);
export default router;
