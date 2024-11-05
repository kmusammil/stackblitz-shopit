var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('cart/view-cart');
});

module.exports = router;