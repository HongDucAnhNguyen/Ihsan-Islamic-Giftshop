//All registered users have their Carts information stored in db

import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,

    required: [true, "please provide a user id"],
    unique: true,
    ref: "User",
  },

  items: {
    type: [
      {
        productId: { type: String },
        name: { type: String },
        price: { type: Number },
        image: { type: String },
        stock: { type: Number },
        quantity: { type: Number },
      },
    ],
    validate: {
      validator: function (value) {
        return value.length <= 10;
      },
      message: "only a maximum of 10 items allowed in cart",
    },
  },
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
