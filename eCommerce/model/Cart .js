import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true, default: 0 }
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
