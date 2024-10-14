const Product = require('../models/Product');

module.exports = {
    addProduct: async (productDetails, imagePath) => {
        const { name, description, price, category, stock } = productDetails;

        // Validate required fields
        if (!name || !description || !price || !category || !stock) {
            throw new Error('All fields are required');
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl: imagePath // Store the image URL or path in your product document
        });

        const savedProducts = await newProduct.save();
        return savedProducts;
    }
};
