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
    },
    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            Product.find().lean()
                .then(allProducts => {
                    resolve(allProducts); // Resolve the promise with the fetched products
                })
                .catch(err => {
                    reject(err); // Reject the promise with the error
                });
        });
    },
    deleteProduct:(productId)=>{
        return Product.deleteOne({_id:productId})
    },
    getProductDetails: (productId) => {
        return new Promise((resolve, reject) => {
            Product.findOne({ _id: productId })
                .then((productDetails) => {
                    resolve(productDetails);
                })
                .catch((error) => {
                    console.error("Error fetching product details:", error);
                    reject(error);
                });
        });
    },
    editProduct: (productId, productDetails, imagePath) => {
        // Destructure product details correctly
        const { name, category, price, description, stock } = productDetails;
    
        // Return the result of findOneAndUpdate
        return Product.findOneAndUpdate(
            { _id: productId }, // Query to find the product by ID
            { name, category, price, description, imageUrl:imagePath, stock }, // Fields to update
            { new: true } // Return the updated product
        );
    }
    
    
}

