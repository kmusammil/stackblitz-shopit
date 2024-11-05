
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, 
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
        enum: ['In Stock', 'Out of Stock'], 
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, 
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
