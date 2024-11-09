const cartHelper = require('../helpers/cart-helpers')
const cartCount = async (req, res, next) => {
    if (req.user) {
        try {
            // Fetch cart for the user
            const cart = await cartHelper.setCart(req.user._id, req.session);  // Using the previously defined setCart function
            // Set cart and item count to locals for use in the header partial
            res.locals.cart = cart;
            res.locals.itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);  // Item count
        } catch (error) {
            console.error('Error fetching cart:', error);
            res.locals.itemCount = 0; // Default to 0 if error occurs
        }
    } else {
        res.locals.itemCount = 0; // Default item count when user is not logged in
    }
    next();
};
module.exports = cartCount;
