const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Retrieve the token from cookies

  if (!token) {
    req.session.returnTo = req.originalUrl;
    return res.redirect('/signin'); // Redirect to signin if no token
  }

  jwt.verify(token, JWT_SECRET, (err) => {
    if (err) {
      req.session.returnTo = req.originalUrl;
      return res.redirect('/signin');
    }
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
