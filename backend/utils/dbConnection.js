import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect("mongodb://0.0.0.0:27017/CourseSellingApp");
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;