import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
  },
  description: {
    type: String,
    required: [true, "please enter description"],
  },
  price: {
    type: Number,
    required: [true, "please enter a price"],
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "please enter a product category"],
    enum: {
      values: ["Quran", "Mens Clothing", "Womens Clothing", "Accessories"],
      message: "please select a valid category",
    },
  },

  stock: {
    type: Number,
    required: [true, "please enter valid stock"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      //TODO: user who commented
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  //when was this product created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
