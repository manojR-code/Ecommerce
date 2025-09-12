const jwt = require('jsonwebtoken');
const config = require('../config/development.json')
function tokenGenerator(email) {
    let token = jwt.sign(email, config.SECRET);
    return token;
}
module.exports = tokenGenerator;