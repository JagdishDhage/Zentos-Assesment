import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
