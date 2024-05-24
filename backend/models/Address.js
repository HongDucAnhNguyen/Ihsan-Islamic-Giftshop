//users can add shipping and billing addresses for purchases

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "please provide a user id"],
  },

  streetAddress: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  ProvinceState: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  //TODO: add users that this address is linked to, users because users can have the same address
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Address ||
  mongoose.model("Address", addressSchema);
