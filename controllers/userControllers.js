const prisma = require('../prisma/index.js');  // Import Prisma client
const cookieToken = require('../utils/cookieToken.js');
const bcrypt = require('bcryptjs');  // For hashing passwords

// User signup
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        console.log('Received signup request:', req.body);

        if (!name || !email || !password) {
            console.error('Missing required fields');
            return res.status(400).json({ error: 'Please provide all fields' });
        }

        // Check if Prisma client is available
        if (!prisma || !prisma.user) {
            console.error('Prisma client is not defined or user model is missing');
            return res.status(500).json({ error: 'Database connection error' });
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.error('User already exists with this email');
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        console.log('User created successfully:', user);
        cookieToken(user, res);
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ error: 'Something went wrong during signup' });
    }
};

// User login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Log the login request
        console.log('Received login request:', req.body);

        // Check for missing fields
        if (!email || !password) {
            console.error('Missing email or password');
            return res.status(400).json({ error: 'Please provide email and password' });
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            console.error('User not found');
            return res.status(400).json({ error: 'User not found' });
        }

        // Compare the entered password with the hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.error('Incorrect password');
            return res.status(400).json({ error: 'Incorrect password' });
        }

        // Send user a token
        cookieToken(user, res);
    } catch (error) {
        // Log any errors that occur
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Something went wrong during login' });
    }
};

// User logout
exports.logout = async (req, res, next) => {
    try {
        // Clear the token cookie
        res.clearCookie('token');

        // Log the logout action
        console.log('User logged out successfully');

        // Send a success response
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        // Log any errors that occur
        console.error('Logout Error:', error);
        res.status(500).json({ error: 'Something went wrong during logout' });
    }
};
