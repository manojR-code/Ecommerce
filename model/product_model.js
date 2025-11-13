const moongoose = require('mongoose');
const Schema = moongoose.Schema({
    image: Buffer,
    Company_id: {
        type: moongoose.Types.ObjectId,
        ref: 'Company_admin'
    }, 
    cat:String,
    name: String,
    price: Number,
    discount: Number,
    description:String,
    bgcolor: String,
    panelclg: String,
    textcolor: String,
    reviews: {
        type: [String],
        default: []
    }
});
module.exports = moongoose.model('products', Schema);