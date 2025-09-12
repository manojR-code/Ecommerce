const jwt = require('jsonwebtoken');
const config = require('../config/development.json')
function AdminToken(name) {
    let token = jwt.sign(name, config.ADMIN_NAME);
    return token;
}
module.exports = AdminToken;