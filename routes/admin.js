var express = require('express');
var router = express.Router();
var multer = require('multer');

// Set up multer storage and file handling
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists in your project root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file with a timestamp to avoid conflicts
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
router.post('/add-product', function (req, res) {
  console.log(req.body);
  console.log(req.files)
});

module.exports = router;
