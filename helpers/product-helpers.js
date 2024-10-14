const Product = require('../models/Product')
module.exports={
    addProduct:async (productDetails, imagePath)=>{
        const { name, description, price, category, stock } = productDetails;
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
}