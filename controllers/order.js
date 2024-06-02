const Order = require('../models/Order'); 

// Function to get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({isDelivered:true});
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

// Function to create a new order
const createOrder = async (req, res) => {
    const { customerName, items } = req.body;

    try {
        const newOrder = new Order({
            customerName,
            items,
        });

        await newOrder.save();
        res.status(201).json(newOrder);

        req.io.emit('newOrder', newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

module.exports = {
    getAllOrders,
    createOrder,
};