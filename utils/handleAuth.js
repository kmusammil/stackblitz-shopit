const setTokenCookie = require('./setTokenCookie');
const Cart = require('../models/Cart');

const handleAuth = async (req, res, userHelperFunction) => {
  try {
    const result = await userHelperFunction(req.body);

    if (result.success) {
      setTokenCookie(req, res, result.user);
      const redirectTo = req.session.returnTo || '/';
      delete req.session.returnTo; // Clear the saved URL
      if (Cart){
      let cart = await Cart.findOne({ _id: result.user._id }).populate('items.productId');
      const itemCount = cart ? cart.items.reduce((count, item) => count + item.quantity, 0) : 0;
      res.locals.itemCount = itemCount;
      }else {
        console.log('no Cart')
      }
      return res.redirect(redirectTo);
    } else {
      res.render('errors/sign-error', { message: 'Invalid credentials. Please try again.' });
    }
  } catch (error) {
    res.render('errors/sign-error', { message: 'An error occurred. Please try again later.' });
  }
};

module.exports = handleAuth;
