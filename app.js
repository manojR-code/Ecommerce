const express = require('express');
const events = require('events');
events.EventEmitter.defaultMaxListeners = 15;
const cookieParser = require('cookie-parser');
const owenerRouter = require('./routes/owenerRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const landing_page = require('./routes/landing_page');
const logout= require('./routes/logout');
const login = require('./routes/loginpage');
const db = require('./config/mongoose_connection');
let path = require('path');
const app = express();
const port = 3000;
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/login', login);
app.use('/login/admin_login', login);
app.use('/owner', owenerRouter);
app.use('/logout', logout);
app.use('/products', productRouter);
app.use('/Home_page', userRouter);
app.use('/owners/signup', owenerRouter);
app.use('/admin', owenerRouter);
app.use('/signin', landing_page);
app.use('/Home_page/cart', userRouter);
app.use('/Home_page/cart/remove', userRouter);
app.use('/Home_page/add_to_cart', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})