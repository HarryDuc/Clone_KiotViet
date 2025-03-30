import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogCategories",
  },
  order: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Đang hoạt động", "Ngừng hoạt động"],
    default: "Đang hoạt động",
  },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
blogCategorySchema.index({ storeId: 1 });
blogCategorySchema.index({ slug: 1 }, { unique: true });
blogCategorySchema.index({ parentCategory: 1 });
blogCategorySchema.index({ status: 1 });
blogCategorySchema.index({ order: 1 });

export default mongoose.model("BlogCategories", blogCategorySchema);
