import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("already connectd to database");
    }
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
