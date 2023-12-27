import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    image: String,
    name: String,
    description: String,
    price: Number,
    quantity: Number
});

export const Product = model('products', productSchema);

export default Product;