import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  shippingInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      productName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      productImage: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],

  paymentInfo: {
    stripePaymentId: {
      type: String,
    },
    //is payed?
    status: {
      type: String,
      required: true,
    },
    taxPaid: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
  },

  orderStatus: {
    type: String,
    default: "Processing",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
