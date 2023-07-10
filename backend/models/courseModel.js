import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Course", courseSchema);
