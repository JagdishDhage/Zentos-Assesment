import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
         type: String,
         required: true 
        },
    email: { 
        type: String, 
        required: true, 
        unique: true },
    passwordHash: { 
        type: String, 
        required: true },
    role: {
      type: String,
      enum: ["customer", "vendor", "admin"],
      default: "customer",
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
