const mongoose = require('mongoose');
const config = require('./development.json');
mongoose.connect(config.MONGODB_URL, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose;