var express = require('express');
var router = express.Router();
var multer = require('multer');
var productHelper = require('../helpers/product-helpers');
const userHelper = require('../helpers/user-helpers');

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
router.get('/', async function (req, res) {
  const allProducts = await productHelper.getAllProducts();
  res.render('admin/view-products-table', { admin: true, allProducts });
});
router.get('/add-product', function (req, res) {
  res.render('admin/add-products');
});
router.post('/add-product', upload.single('imageUrl'), async function (req, res) {
  try {
    console.log(req.file.path); // Log the uploaded file path
    // Ensure that req.file and req.body are defined
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const savedProduct = await productHelper.addProduct(req.body, req.file.path);
    res.redirect('/protected/admin');
  } catch (error) {
    console.error('Error while adding product:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/delete/:id', async (req, res) => {
  productId = req.params.id;
  await productHelper.deleteProduct(productId)
  res.redirect('/protected/admin')
})
router.get('/edit/:id', async (req, res) => {
  productId = req.params.id;
  const productDetails = await productHelper.getProductDetails(productId);
  console.log(productDetails);
  // Convert `productDetails` to a plain object
  const productDetailsPlain = productDetails.toObject ? productDetails.toObject() : productDetails;
  res.render('admin/edit-product', { productDetails: productDetailsPlain });
})
router.post('/edit/:id/:imagePath', upload.single('imageUrl'), async (req, res) => {
  const productId= req.params.id;
  const productDetails= req.body;
  let imagePath;
  if (req.file){
    imagePath= req.file.path;
  } else{
    imagePath = decodeURIComponent(req.params.imagePath); 
  }
  await productHelper.editProduct(productId, productDetails, imagePath)
  res.redirect('/protected/admin')
})

router.get('/all-users', async (req, res)=>{

  const allUsers = await userHelper.getAllUsers();

  const transformedUsers = allUsers.map(user => ({ 
    name: user.name, 
    email: user.email, 
    password: user.password
   }));

  const context = { users: transformedUsers };
  res.render('admin/view-users', context);
})

router.get('/delete-user/:email', async (req, res) => {
  const userEmail = req.params.email;
  console.log('Email from URL:', userEmail); // Check the email being passed
  await userHelper.deleteUser(userEmail);
  res.redirect('/protected/admin/all-users');
});


module.exports = router;
