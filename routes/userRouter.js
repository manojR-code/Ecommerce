const app = require('express');
const mongoose = require('mongoose');
const MiddleWare = require('../middlewares/cookieschecker');
const userInfo = require('../model/users_mode');
const product = require('../model/product_model');
const router = app.Router();
router.get('/', MiddleWare,  async (req, res) => {
    let products = await product.find({});
    res.render('user_page',{products});
})
router.get('/cart', MiddleWare, async (req, res) => {
    let user = await userInfo.findOne({ email: req.cookies.username }).populate('cart');
    res.render("carts_items", { user });
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

        // Check if the product already exists in the cart
        const exists = user.cart.some((item) => item._id.toString() === productId.toString());

        if (!exists) {
            user.cart.push(productId); // Add the product to the cart if it doesn't exist
            await user.save();
            console.log(`Product ${productId} added to cart`);
        } else {
            console.log(`Product ${productId} already exists in the cart`);
        }

        res.redirect('/Home_page');
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).send('Internal server error');
    }
});
    router.get('/remove:id', async (req, res) => {
        try {
            // Find the user by email
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
    
module.exports=router