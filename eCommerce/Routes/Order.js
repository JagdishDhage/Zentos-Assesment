import express from 'express';
import orderController from '../Controller/Order.js';
const router = express.Router();


router.post('/', orderController.placeOrder);
router.get('/:userId', orderController.getUserOrders);
router.put('/:id/status', orderController.updateOrderStatus);

export default router;
