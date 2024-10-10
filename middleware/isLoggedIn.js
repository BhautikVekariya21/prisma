const prisma = require('../prisma/index');
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.error('Login error: No token provided');
      return res.status(401).json({ error: 'Please login' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

    req.user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!req.user) {
      console.error('Login error: User not found from token');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User authenticated successfully:', req.user);
    next();

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = isLoggedIn;
