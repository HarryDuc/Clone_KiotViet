import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "BlogCategories" },
  thumbnail: { type: String },
  content: { type: String },
  excerpt: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Employees" },
  tags: [{ type: String }],
  status: {
    type: String,
    enum: ["Bản nháp", "Đã xuất bản", "Đã lưu trữ"],
    default: "Bản nháp",
  },
  publishedAt: { type: Date },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      content: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    ogImage: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
blogPostSchema.index({ storeId: 1 });
blogPostSchema.index({ slug: 1 }, { unique: true });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ status: 1 });
blogPostSchema.index({ publishedAt: 1 });
blogPostSchema.index({ tags: 1 });

export default mongoose.model("BlogPosts", blogPostSchema);
