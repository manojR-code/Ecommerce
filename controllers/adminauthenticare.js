const express = require('express');
const userInfo = require('../model/owner_model');
const router = express.Router();
const bcrypt = require('bcrypt');
const token = require('../utils/tokengenerator');
const arrow= async (req, res) => {
    let { username, password } = req.body;
    let info = await userInfo.findOne({ fullname: username });
    if (info) {
            if (result) {
                res.cookie("token", token(username));
                res.redirect('/admin');
            } else {
                res.send("Password is incorrect");
        }
    }
    else{res.send("something went wrong please try to login again or if you don't have an account then create one ").status(404)}
};
module.exports = arrow;