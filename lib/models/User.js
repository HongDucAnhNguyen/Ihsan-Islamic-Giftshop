import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength: [8, "Your password must be at least 8 characters long"],
  },
  avatar: {
    //user can upload avatar image
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    required: [true, "please specify user role"],
    default: "user",
  },
  createdAt: {
    type: Date,

    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
