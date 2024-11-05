const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


const checkLogin = (req, res, next) => {
    const token = req.cookies.token; // Retrieve the token from cookies

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                req.session.redirectTo = req.originalUrl;
                return res.redirect('/signin')
            }
            res.locals.user = user;
            next(); // Proceed to the next middleware or route handler
        });
    }else{
        next()
    }
};

module.exports = checkLogin;
