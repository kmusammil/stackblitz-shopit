module.exports={
    addProduct:async (productDetails, imagePath)=>{
        const { name, description, price, category, stock } = productDetails;
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            imagePath, // Store the image URL or path in your product document
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }
}