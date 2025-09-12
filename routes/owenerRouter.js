let experss = require('express');
const router = experss.Router();
const middlewaress=require('../middlewares/cookiescheckeradmin');
router.get('/', middlewaress,(req, res) => {
    res.render('admin');
});
module.exports = router;