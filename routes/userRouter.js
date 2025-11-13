const app = require('express');
const mongoose = require('mongoose');
const MiddleWare = require('../middlewares/cookieschecker');
const userInfo = require('../model/users_mode');
const product = require('../model/product_model');
const ownerDB = require('../model/owner_model');
const multer = require('multer');
const profileup = require('../config/mlter_confi');
const { Error } = require('../config/mongoose_connection');
const router = app.Router();
router.get('/', MiddleWare, async (req, res) => {
    let products = await product.find({});
    res.render('user_page', { products });   
});
router.post('/add_review:id', MiddleWare, async (req, res) => {
    try {
        const productId = new mongoose.Types.ObjectId(req.params.id);
        let productDetails = await product.findOne({ _id: productId });
        let name = await userInfo.findOne({ email: req.cookies.username });
        let { review } = req.body;
        productDetails.reviews.push(name.fullname + " : " + review);
        await productDetails.save();
        res.redirect(`/Home_page/show_case${productId}`);
    } catch (err) {
        res.send("An Error Accured Adding Review", err);
    }

});
router.get('/cart', MiddleWare, async (req, res) => {
    let user = await userInfo.findOne({ email: req.cookies.username }).populate('cart');
    res.render("carts_items", { user });
});
router.get('/show_case:id', MiddleWare, async (req, res) => {
    try {
        const productId1 = new mongoose.Types.ObjectId(req.params.id);
        let productDetails = await product.findOne({ _id: productId1 });
        let company = await ownerDB.findOne({ _id: productDetails.Company_id }).populate('company_products');
        res.render('show_case_pro', { productDetails, company });
    } catch (err) {
        console.log("An Error Accured", err);
    }
});
router.get('/add_to_cart:id', async (req, res) => {
    try {
        let user = await userInfo.findOne({ email: req.cookies.username }).populate('cart');
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (!user.cart) {
            user.cart = [];
        }
        const productId = new mongoose.Types.ObjectId(req.params.id);
        const exists = user.cart.some((item) => item._id.toString() === productId.toString());
        if (!exists) {
            user.cart.push(productId);
            await user.save();
        }
        res.redirect('/Home_page/cart');
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});
router.get('/remove:id', async (req, res) => {
    try {
        let user = await userInfo.findOne({ email: req.cookies.username });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const productId = new mongoose.Types.ObjectId(req.params.id);
        user.cart.pull(productId);
        await user.save();
        res.redirect('/Home_page/cart');
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});
router.get('/shop', async (req, res) => {
    const shops = await ownerDB.find({}).populate('company_products');
    res.render("shops", { shops });
})
router.get('/profile', async (req, res) => {
    try {
        let user = await userInfo.findOne({ email: req.cookies.username });
        res.render('profile', { user });
    } catch (err) {
        console.log("An Error Accured", err);
    }
});
router.post('/profile/add/profile_image', profileup.single('profileimage'), async (req, res) => {
    let user = await userInfo.findOne({ email: req.cookies.username });
    let data = req.file.originalname.split('.');
    if (data[1] == 'jpg' || data[1] == 'png' || data[1] == 'webp') {
        user.picture = req.file.buffer;
        await user.save();
        res.redirect('/Home_page/profile');
    } else {
        res.send("internal server error please upload images not any file you idiot are you blind (kannu kanalva image aku loffer) and also make sure you upload only jpg png webp files").status(500);
    }
});
router.post('/profile/add/:dyna', async (req, res) => {
    let { email, password, contact, pincode, address, city } = req.body;
    if (address) {
        await userInfo.updateOne({ email: req.cookies.username }, { $set: { Address:address } });
    } else if (email) {
        await userInfo.updateOne({ email: req.cookies.username }, { $set: { email } });
    }
    else if (password) {
        await userInfo.updateOne({ email: req.cookies.username }, { $set: { password } });
    } else if (contact) {
        await userInfo.updateOne({ email: req.cookies.username }, { $set: { contact } });
    } else if (pincode) {
        await userInfo.updateOne({ email: req.cookies.username }, { $set: { pincode } });
    } else if (city) {
        await userInfo.updateOne({ email: req.cookies.username }, { $set: { city } });
    }
    res.redirect(`/Home_page/profile`);
});
module.exports = router