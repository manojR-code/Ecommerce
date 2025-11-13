let experss = require('express');
const jwt = require('jsonwebtoken');
const router = experss.Router();
const config = require('../config/development.json');
const multer = require('../config/mlter_confi');
const bcrypt = require('bcrypt');
const onwerdb = require('../model/owner_model');
const middlewaress = require('../middlewares/cookiescheckeradmin');
const company = require('../model/owner_model');
const productdb = require('../model/product_model');
const tokenadmincom = require('../utils/tokengenerator');
const { default: mongoose } = require('mongoose');
router.get('/', middlewaress, async (req, res) => {
    try {
        if (req.cookies.COMADMIN_TOKEN) {
            jwt.verify(req.cookies.COMADMIN_TOKEN, config.SECRET, async function (err, decoded) {
                var particular_company = await company.findOne({ company_email: decoded }).populate('company_products');
                res.render('admin', { isadmin: req.cookies.ISLOGINMAINADMIN, companys: particular_company });
            });
        } else if (req.cookies.tokenADMIN) {
            const list = await company.find({});
            res.render('admin', { isadmin: req.cookies.ISLOGINMAINADMIN, company: list,companys:null });
        }
    } catch (err) {
        console.log("Something Went Wrong", err);
    }
});
router.get('/admin_sigin', (req, res) => {
    res.render('owners_sigin');
});
router.post('/sigin_in', multer.single('company_logo'), async (req, res) => {
    try {
        let { company_name, about_company, company_logo, email, phone, password, address } = req.body;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                await onwerdb.create({
                    company_name,
                    company_logo: req.file.buffer,
                    company_email: email,
                    company_password: hash,
                    company_address: address,
                    company_phone: phone,
                    company_description: about_company
                });
            });
        });
        res.cookie("COMADMIN_TOKEN", tokenadmincom(email));
        res.redirect('/owner/admin_sigin/admin_login');
    } catch (err) {
        res.send("Something went wrong", err);
    }
});
router.post('/admin_verify', async (req, res) => {
    let { email, password } = req.body;
    let info = await onwerdb.findOne({ company_email: email });
    if (info) {
        bcrypt.compare(password, info.company_password, function (err, result) {
            if (result) {
                res.cookie("COMADMIN_TOKEN", tokenadmincom(email));
                res.cookie("ISLOGINMAINADMIN", false);
                res.clearCookie("tokenADMIN");
                res.redirect('/admin');
            }
        });
    } else {
        res.send("Password or email is not correct")
    }
});

router.get('/admin_login', (req, res) => {
    res.render('com_admin_login');
});
router.get('/removes:id', async (req, res) => {
    try {
        let id = new mongoose.Types.ObjectId(req.params.id);
        await productdb.deleteMany({ Company_id: id });
        await onwerdb.findOneAndDelete({ _id: id });
        return res.redirect('/admin');

    } catch (err) {
        res.send("Something went wrong" + err);
    }
});
router.get('/removeproduct:id', async (req, res) => {
    const pro = new mongoose.Types.ObjectId(req.params.id);
    await productdb.findOneAndDelete({ _id: pro });
    res.redirect('/admin');
})
module.exports = router;