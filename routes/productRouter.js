const app = require('express');
const product = require('../model/product_model');
const multer = require('multer');
const company = require('../model/owner_model');
const jwt = require('jsonwebtoken');
const config = require('../config/development.json')
const upload = require('../config/mlter_confi');
const { default: mongoose } = require('mongoose');
const router = app.Router();
router.post('/add_product', upload.single('image'), async (req, res) => {
    let { name, price, discount, description, bgcolor, panelclg, textcolor, cat } = req.body;
    let data = req.file.originalname.split('.');
    if (data[1] == 'pdf') {
         res.send("you duffer not upload pdf type ")
    }
    try {
        if (req.cookies.COMADMIN_TOKEN) {
            jwt.verify(req.cookies.COMADMIN_TOKEN, config.SECRET, async function (err, decoded) {
                var particular_company = await company.findOne({ company_email: decoded }).populate('company_products');
                let newProduct = await product.create({
                    cat: cat,
                    image : req.file.buffer,
                    name: req.body.productname,
                    Company_id: particular_company._id,
                    price,
                    discount,
                    description,
                    bgcolor,
                    panelclg,
                    textcolor
                });
                    particular_company.company_products.push(newProduct._id);
                    newProduct.Company_id = particular_company._id;
                    await newProduct.save();
                    await particular_company.save();
                
            });
        }
        res.redirect("/admin");

    } catch (err) {
            res.send(`iyou duuffer go and login or create an account <a href="owner/admin_sigin">Click here</a>`).status(500);
    }

});

module.exports = router;