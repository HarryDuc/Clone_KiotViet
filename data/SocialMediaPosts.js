import mongoose from "mongoose";

const socialMediaPostSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalesChannels",
    required: true,
  },
  // Thông tin bài đăng
  title: { type: String, required: true },
  content: { type: String },
  media: [
    {
      type: { type: String, enum: ["image", "video", "link"] },
      url: { type: String },
      caption: { type: String },
    },
  ],
  // Cài đặt đăng bài
  schedule: {
    isScheduled: { type: Boolean, default: false },
    scheduledTime: { type: Date },
    timezone: { type: String },
  },
  // Tương tác
  engagement: {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  // Sản phẩm liên quan
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      name: { type: String },
      price: { type: Number },
      discount: { type: Number },
    },
  ],
  // Hashtags và mentions
  hashtags: [{ type: String }],
  mentions: [{ type: String }],
  // Trạng thái
  status: {
    type: String,
    enum: ["Bản nháp", "Đã lên lịch", "Đã đăng", "Đã hủy", "Lỗi"],
    default: "Bản nháp",
  },
  // Thông tin đăng
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employees",
  },
  postedAt: { type: Date },
  // Thông tin nền tảng
  platformPostId: { type: String }, // ID bài đăng trên nền tảng
  platformPostUrl: { type: String }, // URL bài đăng trên nền tảng
  platform: { type: String }, // Tên nền tảng (Facebook, Instagram, etc.)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes
socialMediaPostSchema.index({ storeId: 1 });
socialMediaPostSchema.index({ channelId: 1 });
socialMediaPostSchema.index({ "schedule.scheduledTime": 1 });
socialMediaPostSchema.index({ status: 1 });

export default mongoose.model("SocialMediaPosts", socialMediaPostSchema);
