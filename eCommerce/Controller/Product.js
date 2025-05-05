import Product from '../model/Product.js';

const productControll = {
    createProduct: async (req, res) => {
        try {
            const product = new Product(req.body);
            const savedProduct = await product.save();
            res.status(201).json(savedProduct);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).json({ error: 'Product not found' });
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.json({ message: 'Product deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getProductsByVendor: async (req, res) => {
        try {
            const products = await Product.find({ vendorId: req.params.vendorId });
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

export default productControll;
