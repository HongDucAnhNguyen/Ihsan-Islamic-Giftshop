import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    //console.log("already connected");
  }
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URI);

    //console.log("established connection");
  } catch (error) {}
};

export default dbConnect;
