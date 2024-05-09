import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "please provide a user id"],
    unique: true,
  },

  items: [
    {
      productId: { type: String },
      name: { type: String },
      price: { type: Number },
      image: { type: String },
      stock: { type: Number },
      quantity: { type: Number },
    },
  ],
});




export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
