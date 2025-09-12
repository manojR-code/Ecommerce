const moongoose = require('mongoose');
const Owner_scheme = moongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    contact: {
        type: Number,
    },
    products: {
        type: Array,
        default: []
    },
    products:String,
    picture: String
});
module.exports = moongoose.model('owner', Owner_scheme);