const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


const setTokenCookie = (req, res, user) => {
  
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600000 // 1 hour in milliseconds
  });

};

module.exports = setTokenCookie;
