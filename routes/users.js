var express = require('express');
var router = express.Router();
var productHelper= require('../helpers/product-helpers')

/* GET home page. */
router.get('/', async function(req, res) {
  try {
      const allProducts = await productHelper.getAllProducts(); 
      res.render('user/view-products', { allProducts }); 
  } catch (err) {
      res.send(err)
  }
});



module.exports = router;