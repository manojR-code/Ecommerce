const moongoose = require('mongoose');
const Schema = moongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount: Number,
    description:String,
    bgcolor: String,
    panelclg: String,
    textcolor: String,
});
module.exports = moongoose.model('products', Schema);