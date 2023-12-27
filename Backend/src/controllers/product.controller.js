import Product from '../db/models/product.model.js';

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, image } = req.body;

        if (!name || !description || !price || !quantity || !image) {
            return res.response(null, 'Missing params', 400);
        }

        Product.create({
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            image: image
        });

        res.response(null, 'Product created successfully', 200);
    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.response(null, 'Missing params', 400);
        }

        const product = await Product.findOne({ _id: id });

        if (!product) {
            return res.response(null, 'Product not found', 404);
        }

        res.response(product, 'Product found', 200);
    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.response(products, 'Products found', 200);
    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, quantity, image } = req.body;

        if (!id || !name || !description || !price || !quantity || !image) {
            return res.response(null, 'Missing params', 400);
        }

        const product = await Product.findOne({ _id: id });

        if (!product) {
            return res.response(null, 'Product not found', 404);
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        product.image = image;

        product.save();

        res.response(null, 'Product updated successfully', 200);
    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const isRegistered = await Product.findOne({ _id: id });

        if (!isRegistered) {
            res.response(null, 'Product not registered', 400);
            return;
        }

        await Product.deleteOne({ _id: id });

        res.response(null, 'Product deleted successfully', 200);
    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}