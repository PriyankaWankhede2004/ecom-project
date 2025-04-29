const express = require('express');
const router = express.Router();
const { placeOrder, getOrders, cancelOrderItem } = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/:userId', getOrders);

router.patch('/:orderId/cancel-item/:itemId', cancelOrderItem);

module.exports = router;
