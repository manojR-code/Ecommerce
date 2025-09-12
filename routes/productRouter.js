const app = require('express');
const product = require('../model/product_model');
const upload = require('../config/mlter_confi');
const router = app.Router();
router.post('/add_product', upload.single('image'), async (req, res) => {
    let { name, price, discount, description, bgcolor, panelclg, textcolor } = req.body;
    try {
        let newProduct = await product.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            description,
            bgcolor,
            panelclg,
            textcolor
        });
        res.redirect("/admin");
    } catch (err) {
        console.log("Something went wrong", err);
    }
  
});
module.exports = router;