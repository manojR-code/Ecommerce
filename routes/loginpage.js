let experss = require('express');
const token = require('../utils/tokengenerator');
const AdminToken = require('../utils/admintoken');
const MiddleWare = require('../middlewares/cookieschecker');
const authenticate = require('../controllers/authenticate');
const config = require('../config/development.json');
const router = experss.Router();
router.get('/', async (req, res) => {
    res.render("loginpage");
});
router.get('/admin_login', (req, res) => {
    res.render('admin_login');
});
router.post('/admin_verify', (req, res) => {
    if (req.body.password.toUpperCase() === config.ADMIN_PASSWORD && req.body.username.toUpperCase() === config.ADMIN_NAME) {
        res.cookie("tokenADMIN", AdminToken(req.body.username));
        res.clearCookie("COMADMIN_TOKEN");
        res.cookie("ISLOGINMAINADMIN", true);
        res.redirect(`/admin`);
    } else {
        res.send("Please Check Your Password Or Name")
    }
});
router.post('/registers', authenticate);
module.exports = router;