import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên thương hiệu
  location: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Branches", branchSchema);
