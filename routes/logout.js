const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.clearCookie("token", "");
    res.redirect('/login');
});
router.get('/logout_all', (req, res) => {
    res.clearCookie("tokenADMIN");
    res.clearCookie("ISLOGINMAINADMIN");
    res.clearCookie("COMADMIN_TOKEN");
    res.redirect('/login');
});
module.exports = router;