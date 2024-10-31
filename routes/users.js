var express = require('express');
var router = express.Router();
var productHelper= require('../helpers/product-helpers')

/* GET home page. */
router.get('/', async function(req, res) {
  try {
      const allProducts = await productHelper.getAllProducts(); // Wait for the products to be fetched
      res.render('user/view-products', { allProducts }); // Render the template with the fetched products
  } catch (err) {
      res.send(err)
  }
});



module.exports = router;
