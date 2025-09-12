const express = require('express');
const User = require('../model/users_mode');
const bcrypt = require('bcrypt');
const router = express.Router();
const token = require('../utils/tokengenerator');
router.get('/',  (req, res) => {
    res.render('Landing_page');
});
router.post('/register', async (req, res) => {
    let find = await User.findOne({email:req.body.email });
    if (find) {
        res.send("already a user exists in database try to login");
    } else {
        try {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                    await User.create({ fullname: req.body.fullname, email: req.body.email, password: hash,cart:[] });
                });
            });
    res.cookie("token",token(req.body.email));
    res.redirect('/login');
        }
        catch (err) { res.send("something went wrong"); }
    }
    
});
module.exports = router;