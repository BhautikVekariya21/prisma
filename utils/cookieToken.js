const jwt = require('jsonwebtoken');

const getJwtToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1 day' });
};

const cookieToken = (user, res) => {
  const token = getJwtToken(user.id);

  // Set token in cookie
  res.cookie('token', token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  console.log('Token sent in cookie:', token);
  res.status(200).json({ success: true, token, user });
};

module.exports = cookieToken;
