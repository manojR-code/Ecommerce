const moongoose = require('mongoose');
const Company_admin = moongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    company_logo: Buffer,
    company_email: {
        type: String,
        required: true
    },
    company_password: {
        type: String,
        required: true
    },
    company_address: {
        type: String,
        required: true
    },
    company_phone: {
        type: String,
        required: true
    },
    company_description: {
        type: String,
        required: true
    },
    company_products: [{
        type: moongoose.Schema.Types.ObjectId,
        ref: 'products'
    }
    ],   
});
module.exports = moongoose.model('Company_admin', Company_admin);