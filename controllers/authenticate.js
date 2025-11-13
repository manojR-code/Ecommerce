const express = require('express');
const userInfo = require('../model/users_mode');
const router = express.Router();
const bcrypt = require('bcrypt');
const token = require('../utils/tokengenerator');
const arrow= async (req, res) => {
    let { email, password } = req.body;
    let info = await userInfo.findOne({ email: email });
    if (info) {
        bcrypt.compare(password, info.password, function (err, result) {
            if (result) {
                res.cookie("token", token(email));
                res.cookie("username", email);
                res.redirect('/Home_page')
            } else {
                res.send("Password or email is not correct")
            }
        });
     }
    else{res.send("something went wrong please try to login again or if you don't have an account then create one follow on these link <a href='/login'>Click Me</a>  ").status(404)}
};
module.exports = arrow;