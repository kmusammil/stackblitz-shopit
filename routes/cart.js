var express = require('express');
var router = express.Router();
var cartHelper = require('../helpers/cart-helpers')

router.get('/', async (req, res) => {
    const userId = req.user._id;
    const cart = await cartHelper.setCart(userId);
    const priceSummary = await cartHelper.calculatePriceSummary(cart.items)
    res.render('cart/view-cart', { cart: cart.toJSON(), priceSummary });
});


router.get('/add-to-cart/:productId', async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id;
    await cartHelper.addToCart(productId, userId);
    res.redirect('/')
})

module.exports = router;