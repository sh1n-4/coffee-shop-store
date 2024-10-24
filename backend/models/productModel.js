const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
});

// Registering the model with Mongoose
const Product = mongoose.model('Product', productSchema);

module.exports = Product;