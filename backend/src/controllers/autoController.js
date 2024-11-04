import { pool } from '../config/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User Signup
export const signup = async (req, res) => {
    try {
        const { username, password, instrument, role } = req.body;

        if (!username || !password || !instrument || !role) {
            return res.status(400).json({ message: 'Missing fields' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [matchingUsers] = await pool.query('SELECT * FROM users WHERE username = ?',
        [username]);
        if (matchingUsers.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        await pool.query('INSERT INTO users (username, password, instrument, role) VALUES (?, ?, ?, ?)', 
        [username, hashedPassword, instrument, role]);
        res.status(201).json({ message: 'User registered successfully' });
        
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'An error occurred during signup' });
    }
};

// User Login
export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Missing username or password' });
    }

    try {
        const [matchingUsers] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = matchingUsers[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const accessToken = jwt.sign(
            { username: user.username, instrument: user.instrument, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ accessToken, role: user.role, instrument: user.instrument });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};

// Admin Login
export const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === process.env.ADMIN_PASSWORD) {
        return res.status(200).json({ message: 'Login successful', role: 'admin' });
    } else {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
};

