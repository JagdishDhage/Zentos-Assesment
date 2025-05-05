import Cart from '../model/Cart.js'; 


const cartController = {
    addToCart: async (req, res) => {
        const { userId, productId, quantity } = req.body;
        try {
            let cart = await Cart.findOne({ userId });
            if (!cart) {
                cart = new Cart({ userId, products: [{ productId, quantity }], total: 0 });
            } else {
                const index = cart.products.findIndex(p => p.productId.equals(productId));
                if (index > -1) {
                    cart.products[index].quantity += quantity;
                } else {
                    cart.products.push({ productId, quantity });
                }
            }
            await cart.save();
            res.json(cart);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
            res.json(cart);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    clearCart: async (req, res) => {
        try {
            await Cart.findOneAndDelete({ userId: req.params.userId });
            res.json({ message: 'Cart cleared' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

export default cartController;
