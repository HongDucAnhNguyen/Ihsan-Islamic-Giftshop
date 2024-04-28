import mongoose from "mongoose";

const dbConnect = async () => {
 
    if (mongoose.connection.readyState >= 1) {
      console.log("already connectd to database");
    }
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI);
  
};

export default dbConnect;
