import Order from '../model/Order.js';

const orderController = {
    placeOrder: async (req, res) => {
        try {
            const order = new Order(req.body);
            await order.save();
            res.status(201).json(order);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getUserOrders: async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateOrderStatus: async (req, res) => {
        try {
            const updated = await Order.findByIdAndUpdate(
                req.params.id,
                { status: req.body.status },
                { new: true }
            );
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};

export default orderController;
