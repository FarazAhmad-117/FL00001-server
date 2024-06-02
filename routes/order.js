const express = require('express');
const { getAllOrders, createOrder } = require('../controllers/order');

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', createOrder);

module.exports = router;