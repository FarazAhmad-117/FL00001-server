const Order = require('../models/Order');

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });

        socket.on('placeOrder', async (orderData) => {
            console.log('Order received:', orderData);
        
            const newOrder = new Order(orderData);
            await newOrder.save();

            io.emit('newOrder', newOrder);
        });

        socket.on('restaurantConnected', async () => {
            console.log('Restaurant connected:', socket.id);
            // Retrieve undelivered orders
            const undeliveredOrders = await Order.find({ isDelivered: false });
            // Emit undelivered orders
            undeliveredOrders.forEach(order => {
                socket.emit('newOrder', order);
            });

            await Order.updateMany({ isDelivered: false }, { $set: { isDelivered: true } });
        });
    });
};

module.exports = socketHandler;