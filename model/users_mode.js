const moongoose = require('mongoose');
const Schema = moongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [{
        type: moongoose.Schema.Types.ObjectId,
        ref: 'products'
    }],
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number,
    },
    picture: Buffer,
    pincode: Number,
    Address: String,
    city: String,
});
module.exports = moongoose.model('users', Schema);