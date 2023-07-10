import mongoose from "mongoose";
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the admin name"],
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
 
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);