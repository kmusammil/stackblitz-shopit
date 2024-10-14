var express = require('express');
var router = express.Router();
var multer = require('multer');
var productHelper = require('../helpers/product-helpers')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory where the files will be stored
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // File name with timestamp
  }
});

var upload = multer({ storage: storage });


// Middleware to parse form data (for non-file inputs)
router.use(express.urlencoded({ extended: true }));
router.get('/', function (req, res) {
  res.render('admin/view-products-table', { admin: true });
});
router.get('/add-product', function (req, res) {
  res.render('admin/add-products');
});
router.post('/add-product', upload.single('product-image'), async function (req, res) {
  savedProducts = await productHelper.addProduct(req.body, req.file.path);
  res.redirect('/admin/view-products-table');
});



module.exports = router;
