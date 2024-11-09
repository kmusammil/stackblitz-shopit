const Cart = require('../models/Cart');
const Product = require('../models/Product');
module.exports = {
    setCart: async (userId) => {
        let cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            cart = new Cart({ userId, items: [] });
            await cart.save();
        }
        return cart;
    },
    addToCart: async (productId, userId) => {
        const quantity = 1

        // Find the product to verify it exists and get its details
        const product = await Product.findById(productId);
        if (!product) {
            return { error: 'Product not found' };
        }

        // Find or create cart for user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create new cart if user doesn't have one
            cart = new Cart({
                userId,
                items: [{
                    productId,
                    quantity
                }]
            });

        } else {
            // Check if product already in cart
            const existingItem = cart.items.find(
                item => item.productId.toString() === productId
            );

            if (existingItem) {
                // Update quantity if product already in cart
                existingItem.quantity += parseInt(quantity);
            } else {
                // Add new item if product not in cart
                cart.items.push({
                    productId,
                    quantity
                });
            }
        }
        await cart.save();
    },
    calculatePriceSummary:(cartItems)=>{
        if (cartItems.length === 0) {
            return {
              subtotal: 0,
              shipping: 0,
              total: 0,
            };
        }
        let subtotal = 0;

        cartItems.forEach(item => {
            subtotal += item.productId.price * item.quantity; 
        });
    
        const shipping = subtotal > 5000 ? 0 : 5; 

        const total = subtotal + shipping;
        return {
        subtotal,
        shipping,
        total,
        }
    }
}


