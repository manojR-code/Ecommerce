// Purpose: Middleware to check if the user is already logged in or not.
const jwt = require('jsonwebtoken');
const config = require('../config/development.json');
function MiddleWare(req, res, next) {
    if (req.cookies.token) {
        jwt.verify(req.cookies.token, config.SECRET, function (err, decoded) {
            if (decoded) {
                next();
            }
            else {
                res.redirect('/login');
            }
        });

    }else{res.send("something went wrong please try to login again or if you don't have an account then create one ").status(404)} 
}
module.exports = MiddleWare;