const jwt = require('jsonwebtoken');
const config = require('../config/development.json');
function MiddleWares(req, res, next) {
    if (req.cookies.tokenADMIN) {
        jwt.verify(req.cookies.tokenADMIN, config.ADMIN_NAME, function (err, decoded) {
            if (decoded) {
                next();
            }
            else {
                res.redirect('/login/admin_login');
            }
        });
    }else{res.send("something went wrong please try to login again or if you don't have an account then create one ").status(404)} 
}
module.exports = MiddleWares;