var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
var userHelper = require('../helpers/user-helpers')
const handleAuth = require('../utils/handleAuth');





/* GET home page. */
router.get('/', async function (req, res) {
  try {
    const allProducts = await productHelper.getAllProducts();
    res.render('user/view-products', { allProducts });
  } catch (err) {
    res.send(err)
  }
});

router.get('/signup', (req, res) => {
  res.render('user/signup')
})
router.post('/signup', async (req, res) => {
  handleAuth(req, res, userHelper.signupUser);
})
router.get('/signin', (req, res) => {
  res.render('user/signin')
})
router.post('/signin', async (req, res) => {
  handleAuth(req, res, userHelper.signinUser);
})

router.get('/signout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});






module.exports = router;