const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    phoneNumber: String,
    items: Array,
    isDelivered: { type: Boolean, default: false } // For Delivery Confirmation at restorant
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;


