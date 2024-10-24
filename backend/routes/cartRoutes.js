const express = require('express');
const CartItem = require('../models/CartModel');
const Product = require('../models/productModel');
const router = express.Router();

// get cart
router.get('/', async(req, res) => {
    try {
        const cartItems = await CartItem.find().populate('productId');
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//remove
router.post('/remove', async (req, res) => {
    const { productId } = req.body;

    try {
        await CartItem.deleteOne({productId});
        const cartItems = await CartItem.find().populate('productId');
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// add
router.post('/add', async (req, res) => {
    const {productId} = req.body;

    try {
        const existingItem = await CartItem.findOne({ productId});

        if (existingItem) {
            existingItem.quantity += 1;
            await existingItem.save();
        } else {
            const newCartItem = new CartItem({productId});
            await newCartItem.save();
        }

        // return updated cart
        const cartItems = await CartItem.find().populate('productId');
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;