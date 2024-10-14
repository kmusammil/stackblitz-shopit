// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // This field is required
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Minimum price cannot be negative
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
        enum: ['In Stock', 'Out of Stock'], // Allowed values for stock
        required: true, // This field is required
    },
    imageUrl: {
        type: String,
        required: true, // Assuming every product has an image
    },
}, {
    timestamps: true, // This will create createdAt and updatedAt fields
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
